import { UIMessage } from 'ai';
import React from 'react';
import UserBubble from './userBubble';
import AssistantBubble from './assistantBubble';
import { Spinner } from '@heroui/react';

interface BubbleListProps {
  messages: UIMessage[];
  status: string;
}
export default function BubbleList(props: BubbleListProps) {
  const { messages, status } = props;
  return (
    <div className="flex-1 overflow-y-auto border-b-1 border-gray-300 text-[13px]">
      {messages.map((message) => (
        <div key={message.id} className="bg-gray-400 m-2 rounded p-2">
          {message.role === 'user' ? (
            <UserBubble message={message}></UserBubble>
          ) : (
            <AssistantBubble message={message}></AssistantBubble>
          )}
        </div>
      ))}
      {status === 'submitted' && (
        <div className="flex justify-center items-center h-[50px]">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
}
