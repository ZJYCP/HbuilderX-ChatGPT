import { Bubble } from '@ant-design/x';
import SenderCom from '../../components/sender';

const messages = [
  {
    content: 'Hello, Ant Design X!',
    role: 'user',
  },
];
export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <Bubble.List items={messages} />
      </div>
      <SenderCom />
    </div>
  );
}
