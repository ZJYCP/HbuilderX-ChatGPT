(function() {
	Vue.directive('focus', {
		update: function(el) {
			el.focus()
		}
	});
	var app = new Vue({
		el: '#app',
		data: {
			list: {},
			inputQuestion: '',
		},
		computed: {

		},
		created() {
			marked.setOptions({
				renderer: new marked.Renderer(),
				highlight: function(code) {
					return hljs.highlightAuto(code).value;
				},
				pedantic: false,
				gfm: true,
				tables: true,
				breaks: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
				xhtml: false
			});
		},
		mounted() {
			//注册监听
			this.$nextTick(() => {
				window.addEventListener('hbuilderxReady', () => {
					this.eventListener();
				})
			});
		},
		methods: {
			eventListener() {

				let that = this;
				hbuilderx.onDidReceiveMessage((msg) => {
					switch (msg.type) {
						case "addQuestion": {
							this.$set(this.list, msg.id, [msg.value, "thinking..."]);
							this.$nextTick(() => {
								const questionList = document.querySelectorAll(
									'.conversition')
								const last = questionList[questionList.length - 1]
								const lastResponse = last.querySelector('.question-block')
								lastResponse.scrollIntoView(false)
							})
							break;
						}
						case "addResponse": {
							this.$set(this.list, msg.id, [this.list[msg.id][0],
								this.prehandle(msg.value)
							])
							this.$nextTick(() => {
								const questionList = document.querySelectorAll(
									'.conversition')
								const last = questionList[questionList.length - 1]
								const lastResponse = last.querySelector('.response-block')
								lastResponse.scrollIntoView(false)
							})
							break;
						}
						default:
							hbuilderx.postMessage({
								command: 'callback',
								data: msg
							});
							break;

					}
				});
			},

			prehandle(response) {
				// let safe_res = response.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
				// let markdownRes = "```\r\n" + response + "\r\n```"
				return marked.parse(response)
			},

			//webview的问题提交
			//webview的问题提交
			submitHandle(question) {
				// 判断question是否为空字符串，如果是通过变量控制提示框的出现，提示错误，并返回
				this.inputQuestion = ''
				if (question === '') {
					this.$message.error({message:'输入不能为空!',center:true});
					return
				}
				hbuilderx.postMessage({
					command: 'addQuestion',
					data: question
				});
			},
			handleClearClick() {
				this.list = {};
				hbuilderx.postMessage({
					command: 'clearConv',
					data: 0
				});
			}

		}
	});
})()