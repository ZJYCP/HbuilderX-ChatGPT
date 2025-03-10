import { Message } from 'ai';
import React from 'react';
import { Brain } from 'lucide-react';
import MarkdownCom from '../markdown';

interface AssistantBubbleProps {
  message: Message;
}
export default function AssistantBubble(props: AssistantBubbleProps) {
  const { message } = props;
  return (
    <div>
      <div className="inline-flex gap-2">
        <Brain style={{ width: '18px', height: '18px' }}></Brain>
        ArtiCode
      </div>
      <div className="border-t-1 pt-1">
        <MarkdownCom>{message.content}</MarkdownCom>
      </div>
    </div>
  );
}
