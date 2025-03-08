import { useChat } from '@ai-sdk/react';
import { HOST } from '../../utils';
import SenderCom from '../../components/sender';
import BubbleList from '../../components/bubbleList';

export default function HomePage() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({
      api: `${HOST}/llm/chat`,
      onError: (err) => {
        console.log('error', err);
      },
    });

  return (
    <>
      <BubbleList messages={messages} status={status}></BubbleList>
      <SenderCom
        content={input}
        status={status}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      ></SenderCom>
    </>
  );
}
