import { IExtMessage } from '../../utils/extType';

const hx = require('hbuilderx');

interface IUseSendMessage {
  sendHandler: (data: IExtMessage) => void;
}
const useSendMessage = (): IUseSendMessage => {
  return {
    sendHandler: (data) => {
      hx.postMessage(data);
    },
  };
};

export default useSendMessage;
