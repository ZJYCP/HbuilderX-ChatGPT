import db from '../db';
import { WebviewMessageType } from '../utils/extType';
import WebBridge from './webBridge';
const hx = require('hbuilderx');
export interface ExtMessageHandler {
  handler(message: any): void | Promise<void>;
}

/**
 * web打开
 */
export class OpenedHandler implements ExtMessageHandler {
  handler(message: any) {
    WebBridge.getInstance().postMessage({
      type: WebviewMessageType.TOKEN,
      data: db.get().token,
    });
  }
}
/**
 * 登陆
 */
export class SignInHandler implements ExtMessageHandler {
  handler(message: any) {
    console.log('SignInHandler', message);
    db.update((data) => {
      data.token = message.token;
    });
  }
}

/**
 * 插入代码到编辑器光标处
 */
export class InsertHandler implements ExtMessageHandler {
  async handler(message: any) {
    const activeTextEditor = await hx.window.getActiveTextEditor();
    if (!activeTextEditor) {
      hx.window.showInformationMessage('当前没有激活的编辑器');
      return;
    }
    // 将结果插入到当前激活的editor上
    activeTextEditor.edit(async (res) => {
      const selection = activeTextEditor.selection;
      res.insert(selection, message);
    });
  }
}

/**
 * 创建新文件
 */
export class NewFileHandler implements ExtMessageHandler {
  async handler(message: any) {
    try {
      const fileName = 'newfile';
      const workspaceFolders = await hx.workspace.getWorkspaceFolders();
      let fileUri;
      if (workspaceFolders) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        fileUri = hx.Uri.file(workspacePath + '/' + fileName);
      } else {
        fileUri = hx.Uri.parse('untitled:' + fileName);
      }
      const document = await hx.workspace.openTextDocument(fileUri);
      const editor = await hx.window.getActiveTextEditor();
      editor.edit((editBuilder) => {
        const position = new hx.Position(0, 0);
        editBuilder.insert(position, message);
      });
    } catch (error) {
      hx.window.showErrorMessage('创建文件失败', JSON.stringify(error));
    }
  }
}

export class SignOutHandler implements ExtMessageHandler {
  handler(message: any) {
    console.log('SignOutHandler', message);
    db.update((data) => {
      data.token = '';
    });
  }
}
