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
			// 监听来自编辑器的数据
			// 1、新增question操作新增question显示---监听只要获得question，就有新的html，
			//然后将这个html插入到原来的html中，然后再获得response，将response的值放在相应的问题下面？需要一个id来区分，哪个是哪个的回答
			// 但是这里question和msg不是一起来的！？因为想要持续显示response的效果
			eventListener() {

				let that = this;
				hbuilderx.onDidReceiveMessage((msg) => {
					switch (msg.type) {
						case "addQuestion": {
							this.$set(this.list, msg.id, [msg.value, "thinking..."])
							break;
						}
						case "addResponse": {
							this.$set(this.list, msg.id, [this.list[msg.id][0],
								this.prehandle(msg.value)
							])
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
				this.inputQuestion = ''
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