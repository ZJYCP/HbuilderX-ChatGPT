import { Message } from 'ai';
import React from 'react';
import { CircleUserRound } from 'lucide-react';
import MarkdownCom from '../markdown';
import { useUserStore } from '../../store';

interface UserBubbleProps {
  message: Message;
}
export default function UserBubble(props: UserBubbleProps) {
  const { message } = props;
  const { userInfo } = useUserStore();
  return (
    <div>
      <div className="inline-flex gap-2">
        <CircleUserRound
          style={{ width: '18px', height: '18px' }}
        ></CircleUserRound>
        {userInfo?.email}
      </div>
      <div className="border-t-1 pt-1">
        <MarkdownCom>{message.content}</MarkdownCom>
      </div>
    </div>
  );
}
