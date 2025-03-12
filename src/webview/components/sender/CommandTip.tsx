import { useMemoizedFn } from 'ahooks';
import { COMMAND_LIST } from '../../utils';

interface CommandTipProps {
  onCommandClick: (command: string) => void;
}
export default function CommandTip(props: CommandTipProps) {
  const { onCommandClick } = props;

  const renderGroup = useMemoizedFn((commandList) => {
    return (
      <div className="text-sm">
        {commandList.map((item) => {
          return (
            <div
              key={item.command}
              className="flex justify-between mb-1 hover:bg-primary-400"
              onClick={() => {
                onCommandClick(item.command);
              }}
            >
              <span className="font-bold">{item.command}</span>
              <span>{item.description}</span>
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <div className="w-full border bottom-[93px] absolute bg-primary-500 px-2">
      <span className="text-xs font-bold">AI指令</span>
      {renderGroup(COMMAND_LIST.filter((item) => item.group === 'ai'))}
      <span className="text-xs font-bold">常规指令</span>
      {renderGroup(COMMAND_LIST.filter((item) => item.group === 'common'))}
    </div>
  );
}
