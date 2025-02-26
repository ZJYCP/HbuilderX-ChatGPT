import { ArtiCodeViewProvider } from '../webview';
const hx = require('hbuilderx');

export function registerWebView(context) {
  // 创建webview
  let webviewPanel = hx.window.createWebView('chatgpt.webview', {
    enableScritps: true,
  });

  let provider = new ArtiCodeViewProvider(webviewPanel);

  hx.window.showView({
    viewId: 'chatgpt.webview',
  });
}
