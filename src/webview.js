const hx = require('hbuilderx');
const path = require('path');
const Html = require('./html.js');
const {
	getHBuilderXThemeData
} = require('./static/theme.js')
require('isomorphic-fetch');
/**
 * @description 显示webview
 */

class ChatGPTViewProvider {
	constructor(webviewPanel) {

		// this._extensionUri = extensionUri
		this.selectedInsideCodeblock = false;
		this.resolveWebviewView(webviewPanel);
		this.updateConfig()
	}

	// 设置webview内容，监听webview里发出的信息
	resolveWebviewView(webviewPanel) {
		this.webView = webviewPanel.webView;

		let webView = webviewPanel.webView;
		let ThemeColorData = getHBuilderXThemeData();
		console.log(ThemeColorData)
		webView.html = Html(ThemeColorData)
		// 处理来自webview的数据
		webView.onDidReceiveMessage((msg) => {
			console.log(msg)
			switch (msg.command) {
				case 'alert': {
					hx.window.showInformationMessage(msg.data);
					webView.postMessage({
						command: "test"
					});
					break;
				}
				case 'callback': {
					console.log('--------------------------');
					console.log(msg.data);
					break
				}
				case 'addQuestion': {
					this.sendOpenAIRequest(msg.data)
					console.log(msg.data)
					break;
				}
				case 'clearConv': {
					//TODO,maybe use that
					this.clearConversationId()
					break;
				}
				case 'interrupt': {
					//TODO,maybe use that
					console.log(msg.data)
					break;
				}
			}
		});

		// 编辑器配置发生修改时，将新的值给webview
		let configurationChangeDisplose = hx.workspace.onDidChangeConfiguration(function(event) {
			if (event.affectsConfiguration("editor.colorScheme") || event.affectsConfiguration(
					"editor.fontSize") || event.affectsConfiguration("editor.fontFamily")) {
				let ThemeColorData = getHBuilderXThemeData();
				webView.postMessage({
					"command": "themeColor",
					"data": ThemeColorData
				});
			};
		});
	}

	updateConfig() {
		/**
		 * 更新配置：重新获取API实例，清除对话框数据
		 */
		let config = hx.workspace.getConfiguration("chatgpt");
		this.extensionConfig = {
			selectedType: config.get('selectedType', "accessToken"),
			accessToken: config.get('accessToken', ""),
			ApiKey: config.get('ApiKey', ""),
			proxy: config.get('proxy', ""),
			apiBaseUrl: config.get('apiBaseUrl', "https://api.openai.com"),
			usePublic: config.get('usePublic', true)
		}
		console.log("update config")
		this._newAPI()
		this.clearConversition()
		// hx.window.showInformationMessage("ChatGPT-代码助手配置成功");
		hx.window.setStatusBarMessage('ChatGPT-代码助手配置成功',1500,'info');

	}
	
	
	clearConversition(){
		this.sendMessageToWebView({type:"clearConversition"})
	}
	
	clearConversationId(){
		this.parentMessageId = undefined
		this.conversationId = undefined
	}

	// 实例化一个ChatGPT api实例
	async _newAPI() {
		// commonJS 动态import
		const {
			ChatGPTAPI,
			ChatGPTConversation,
			ChatGPTUnofficialProxyAPI
		} = await import('chatgpt');
		
		this.clearConversationId()
		
		if (this.extensionConfig.usePublic == true){
			this.extensionConfig.selectedType = "accessToken"
			  try {
				let response = await fetch("http://gettoken.provider.1754953544581946.cn-shanghai.fc.devsapp.net/");
				let res = await response.json();
				this.extensionConfig.accessToken = res.value
				this.extensionConfig.apiReverseProxyUrl = res.apiReverseProxyUrl || 'https://api.pawan.krd/backend-api/conversation'
			  } catch (error) {
				hx.window.setStatusBarMessage('Public Api Request Failed', error);
			  }

		}

		if (this.extensionConfig.selectedType == "accessToken") {
			if (this.extensionConfig.accessToken == "") {
				hx.window.showErrorMessage('accessToken未设置', ['去设置', '关闭']).then((result) => {
					if (result == '去设置') {
						console.log("选择了设置");
						hx.commands.executeCommand('workbench.action.openGlobalSettings')
					} else if (result === '关闭') {
						console.log("选择关闭");
					}
				});
			} else {
				this._chatGPTAPI = new ChatGPTUnofficialProxyAPI({
					accessToken: this.extensionConfig.accessToken,
					debug: false,
					model: "gpt-3.5-turbo",
					apiReverseProxyUrl: this.extensionConfig.apiReverseProxyUrl || 'https://api.pawan.krd/backend-api/conversation'
				})
			}
		} else {
			if (this.extensionConfig.ApiKey == "") {
				hx.window.showErrorMessage('ApiKey未设置', ['去设置', '关闭']).then((result) => {
					if (result == '去设置') {
						console.log("选择了设置");
						hx.commands.executeCommand('workbench.action.openGlobalSettings')
					} else if (result === '关闭') {
						console.log("选择关闭");
					}
				});
			} else {
				const proxy = require('https-proxy-agent');
				const nodeFetch = require("node-fetch")
				let openaiProxy = this.extensionConfig.proxy
				this._chatGPTAPI = new ChatGPTAPI({
					apiKey: this.extensionConfig.ApiKey,
					apiBaseUrl: this.extensionConfig.apiBaseUrl,
					debug: false,
					fetch: openaiProxy ? (url, options = {}) => {
						const defaultOptions = {
							agent: proxy(openaiProxy)
						};

						const mergedOptions = {
							...defaultOptions,
							...options
						};

						return nodeFetch.default(url, mergedOptions);
					} : fetch
				})
			}
		}
	}

	async sendOpenAIRequest(prompt, code) {
		if (!this._chatGPTAPI) {
			await this._newAPI();
		}

		const question = (code) ? `${prompt},用中文回复: ${code}` : prompt;

		this.sendMessageToWebView({
			type: 'addQuestion',
			value: prompt,
			id: this.parentMessageId || '0'
		});

		this._chatGPTAPI.sendMessage(question, {
			conversationId: this.conversationId,
			parentMessageId: this.parentMessageId,
			timeoutMs: 1 * 60 * 1000,
			onProgress: (partialResponse) => {
				// console.log(partialResponse)
				this.sendMessageToWebView({
					type: 'addResponse',
					value: partialResponse.text,
					id: this.parentMessageId || '0'
				});
			},
			// 传入终止请求的函数
			// abortSignal:(controller)=>{
			// 	// 怎么在这里监听键盘事件？
			// }
		}).then((e) => {
			console.log(e)
			this.parentMessageId = e.id
			this.conversationId = e.conversationId
		}).catch((e) => {
			// 出错的情况
			console.log(e)
			this.sendMessageToWebView({
				type: 'addResponse',
				value: e.message,
				id: this.parentMessageId || '0'
			});
			hx.window.showErrorMessage(e.message)
		})

	}

	sendMessageToWebView(message) {
		if (this.webView) {
			this.webView.postMessage(message)
		} else {

		}
	}

}

module.exports = {
	ChatGPTViewProvider
}