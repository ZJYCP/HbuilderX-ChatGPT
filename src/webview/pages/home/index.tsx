import { useChat } from '@ai-sdk/react';
import SenderCom from '../../components/sender';
import BubbleList from '../../components/bubbleList';
import { HOST } from '../../../utils';
import WelcomCom from '../../components/welcome';

export default function HomePage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
    stop,
  } = useChat({
    api: `${HOST}/llm/chat`,
    onError: (err) => {
      console.log('error', err);
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return (
    <>
      {messages.length === 0 ? (
        <WelcomCom></WelcomCom>
      ) : (
        <BubbleList messages={messages} status={status}></BubbleList>
      )}
      <SenderCom
        content={input}
        status={status}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setMessages={setMessages}
      ></SenderCom>
    </>
  );
}
