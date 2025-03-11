import { ExtMessageType, IExtMessage, IWebviewMessage } from '../utils/extType';
import {
  ExtMessageHandler,
  InsertHandler,
  SignInHandler,
  SignOutHandler,
} from './receiveStrategy';

class WebBridge {
  private static instance: WebBridge | null = null;
  private webview: any;
  /** 消息处理器集合 */
  private handlers: Map<ExtMessageType, ExtMessageHandler> = new Map();
  constructor(webview: any) {
    this.webview = webview;
    this.registerReceive();
    this.registerHandlers();
  }

  /**
   * 获得实例,单例模式
   * @param webview
   * @returns
   */
  public static getInstance(webview?: any) {
    if (WebBridge.instance === null) {
      if (webview === undefined) {
        throw new Error('WebBridge instance is not initialized');
      }
      WebBridge.instance = new WebBridge(webview);
    }
    return WebBridge.instance;
  }

  /**
   * 注册接收消息,webview->ext
   */
  private registerReceive() {
    this.webview.onDidReceiveMessage((data: IExtMessage) => {
      const handler = this.handlers.get(data.type);
      if (handler) {
        handler.handler(data.data);
      } else {
        console.warn('未找到对应的handler', data.type);
      }
    });
  }
  private registerHandlers() {
    this.handlers.set(ExtMessageType.SIGNIN, new SignInHandler());
    this.handlers.set(ExtMessageType.SIGNOUT, new SignOutHandler());
    this.handlers.set(ExtMessageType.INSERT, new InsertHandler());
    this.handlers.set(ExtMessageType.NEW_FILE, new NewFileHandler());
  }

  /**
   * ext->webview 发送消息
   * @param message
   */
  public postMessage(message: IWebviewMessage) {
    this.webview.postMessage(message);
  }
}

export default WebBridge;
