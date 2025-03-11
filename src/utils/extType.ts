/** 来自webview的数据 */
export enum ExtMessageType {
  // 登录
  SIGNIN,
  // 登出
  SIGNOUT,
  // Insert,
  INSERT,
  // 新建文件
  NEW_FILE,
}

// 扩展与webview的通信接口
export interface IExtMessage {
  type: ExtMessageType;
  data: any;
}

/** 由扩展发送给webview的数据 */
export enum WebviewMessageType {
  // 发送local的token
  TOKEN,
  // 当前文件信息, 文件内容,文件名,选中行等
  FILE_INFO,
  // 主题色
  THEME,
}
export interface IWebviewMessage {
  type: WebviewMessageType;
  data: any;
}
