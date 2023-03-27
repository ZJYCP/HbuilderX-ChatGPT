const path = require('path');

const vueFile = path.join(path.resolve(__dirname), 'static', 'vue.min.js');
const customCssFile = path.join(path.resolve(__dirname), 'static', 'custom.css');
const iconfontCssFile = path.join(path.resolve(__dirname), 'static', 'iconfont','iconfont.css');


function Html(projectData) {
	return `
    <!DOCTYPE html>
    <html lang="en" @keydown='handleInterrupt'>
        <head>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="${customCssFile}">
			<link rel="stylesheet" href="${iconfontCssFile}">
            <script src="${vueFile}"></script>
        </head>
        <body>
			<div id="app" v-cloak class="app">
				<div class="content">
					<div v-for='(v,k,i) in list' :key='k' class="conversition" v-focus>
						<div class="question-block"><strong>You：</strong> <i>{{v[0]}}</i></div>
						<div class="response-block"><strong>ChatGPT:</strong> {{v[1]}}</div>
					</div>
				</div>
				<div class="bottom">
					<div class="input">
					  <input type="text" v-model='inputQuestion' @keyup.enter='()=>{submitHandle(inputQuestion)}' placeholder='请输入问题' />
						<button @click='()=>{submitHandle(inputQuestion)}' class="submit" ><i class="iconfont icon-submit"></i></button>
					</div>
					<button @click='handleClearClick' class="clearall">清除所有</button>
				</div>		
			</div>
            <script>
                Vue.directive('focus', {
                    inserted: function(el) {
                        el.focus()
                    }
                });
                var app = new Vue({
                    el: '#app',
                    data: {
						list: {},
						inputQuestion:'',
                    },
                    computed: {

                    },
                    created() {
						// var that = this
						// window.addEventListener("message", (msg) => {
						// 	that.test = msg.value;
						// });
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
							
							let that=this;
                            hbuilderx.onDidReceiveMessage((msg) => {
								switch(msg.type){
									case "addQuestion":{
										this.$set(this.list,msg.id,[msg.value,"thinking..."])
										break;
									}
									case "addResponse": {
										this.$set(this.list,msg.id,[this.list[msg.id][0],msg.value])
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
						
						//webview的问题提交
						submitHandle(question){
							this.inputQuestion=''
							hbuilderx.postMessage({
							    command: 'addQuestion',
								data: question
							});
						},
						handleClearClick(){
							this.list={};
							hbuilderx.postMessage({
							    command: 'clearConv',
								data: 0
							});
						}

                    }
                });
            </script>
        </body>
    </html>
`
};

module.exports = Html;