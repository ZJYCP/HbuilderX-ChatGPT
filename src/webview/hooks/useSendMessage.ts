import { IExtMessage } from '../../utils/extType';
import { isDev } from '../utils';

// const hx = require('hbuilderx');

interface IUseSendMessage {
  sendHandler: (data: IExtMessage) => void;
}
const useSendMessage = (): IUseSendMessage => {
  return {
    sendHandler: (data) => {
      if (isDev) {
        console.log('向IDE发送数据', data);
      } else {
        // @ts-ignore
        hbuilderx.postMessage(data);
      }
    },
  };
};

export default useSendMessage;
