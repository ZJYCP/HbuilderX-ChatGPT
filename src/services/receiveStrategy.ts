import { IExtMessage } from '../utils/extType';
import db from './db';

export interface ExtMessageHandler {
  handler(message: any): void;
}

/**
 * 登陆
 */
export class SignInHandler implements ExtMessageHandler {
  handler(message: any) {
    console.log('SignInHandler', message);
    db.update((data) => {
      data.token = message;
    });
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
