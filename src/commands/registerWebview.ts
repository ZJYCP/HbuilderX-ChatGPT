import WebBridge from '../services/webBridge';
import { ArtiCodeViewProvider } from '../webview';
const hx = require('hbuilderx');

export function registerWebView(context) {
  // 创建webview
  let webviewPanel = hx.window.createWebView('chatgpt.webview', {
    enableScritps: true,
  });

  let provider = new ArtiCodeViewProvider(webviewPanel);

  // 设置通信机制
  WebBridge.getInstance(provider.webview);

  hx.window.showView({
    viewId: 'chatgpt.webview',
  });
}
