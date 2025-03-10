import { isDev } from '.';
import { IWebviewMessage, WebviewMessageType } from '../../utils/extType';
import { TokenHandler, WebviewMessageHandler } from './receiveStrategy';

class MessageListener {
  handlers: Map<WebviewMessageType, WebviewMessageHandler> = new Map();

  static instance: MessageListener | null;
  constructor() {}

  public static getInstance() {
    if (MessageListener.instance === null) {
      MessageListener.instance = new MessageListener();
    }

    return MessageListener.instance;
  }

  public registerHandler() {
    this.handlers.set(WebviewMessageType.TOKEN, new TokenHandler());
  }

  start() {
    if (!isDev) {
      // @ts-ignore
      hbuilderx.onDidReceiveMessage((msg: IWebviewMessage) => {
        const handler = this.handlers.get(msg.type);
        if (handler) {
          handler.handler(msg.data);
        } else {
          console.warn('未找到对应的handler', msg.type);
        }
      });
    }
  }
}

export default new MessageListener();
