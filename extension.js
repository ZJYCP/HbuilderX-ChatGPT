var hx = require("hbuilderx");
var {ChatGPTViewProvider} = require('./src/webview.js');
var showSettingDialog = require('./src/setting.js')

//添加在package第15行，通过事件激活插件
	// "activationEvents": [
	// 	"onCommand:extension.helloWorld",
	// 	"onCommand:chatgpt.explain",
	// 	"onView:chatgpt.webview"
	// ],

//该方法将在插件激活的时候调用
async function activate(context) {

	// 创建webview
	let webviewPanel = hx.window.createWebView("chatgpt.webview", {
		enableScritps: true
	});
	hx.window.showView({viewId: "chatgpt.webview"});
	let provider = new ChatGPTViewProvider(webviewPanel);
	
	let eslintConfig = hx.workspace.getConfiguration("eslint-js")
	
	
	//注册事件
	context.subscriptions.push(
		hx.commands.registerCommand('chatgpt.explain', askGPTToExplain),
		hx.commands.registerCommand('chatgpt.findProblems', askGPTWhyBroken),
		hx.commands.registerCommand('chatgpt.refactor', askGPTToRefactor),
		hx.commands.registerCommand('chatgpt.addTest', askGPTToAddTests),
		hx.commands.registerCommand('chatgpt.setting', openSetting),
		
	)
	
	async function askGPTToExplain() { await askChatGPT('解释下面的这段代码'); }
	async function askGPTWhyBroken() { await askChatGPT('这段代码有什么错误吗？'); }
	async function askGPTToRefactor() { await askChatGPT('重构这段代码并说明做了哪些变更'); }
	async function askGPTToAddTests() { await askChatGPT('为下面的代码生成测试代码'); }
	
	async function askChatGPT(promptPrefix){
		if (!promptPrefix){
			promptPrefix = ""
		} else {
			let activeEditor = hx.window.getActiveTextEditor();
			activeEditor.then((editor) => {
				// 获取选中代码块or整个文件
				let selection = editor.selection;
				let selectedText = editor.document.getText(selection);
				
				const entireFileContents = editor.document.getText();

				const code = selectedText
						? selectedText
						: `This is the ${editor.document.languageId} file I'm working on: \n\n${entireFileContents}`;				
				
				provider.sendOpenAIRequest(promptPrefix, code)
			})

		}
	}
	
	async function openSetting(){
		let res = await showSettingDialog(provider)
		// console.log(res)
		// provider.updateConfig()
	}

}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {

}


module.exports = {
	activate,
	deactivate
}
