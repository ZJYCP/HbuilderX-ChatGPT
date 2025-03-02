import { Sender, Suggestion } from '@ant-design/x';
import React from 'react';
import type { GetProp } from 'antd';

type SuggestionItems = Exclude<GetProp<typeof Suggestion, 'items'>, () => void>;

const suggestions: SuggestionItems = [
  { label: 'Write a report', value: 'report' },
  { label: 'Draw a picture', value: 'draw' },
  {
    label: 'Check some knowledge',
    value: 'knowledge',
    extra: 'Extra Info',
  },
];
export default function SenderCom() {
  const [value, setValue] = React.useState('');

  return (
    <Suggestion
      items={suggestions}
      onSelect={(itemVal) => {
        setValue(`[${itemVal}]:`);
      }}
      block
    >
      {({ onTrigger, onKeyDown }) => {
        return (
          <Sender
            value={value}
            onChange={(nextVal) => {
              if (nextVal === '/') {
                onTrigger();
              } else if (!nextVal) {
                onTrigger(false);
              }
              setValue(nextVal);
            }}
            onKeyDown={onKeyDown}
            placeholder="输入 / 获取建议"
          />
        );
      }}
    </Suggestion>
  );
}
