import React, { useMemo } from 'react';
import { Textarea } from '@heroui/react';
import { SendHorizontal } from 'lucide-react';
import { useMemoizedFn } from 'ahooks';
import cx from 'classnames';

interface SenderComProps {
  content: string;
  status: 'ready' | 'submitted' | 'streaming' | 'error';
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}
export default function SenderCom(props: SenderComProps) {
  const { status, content, handleInputChange, handleSubmit } = props;

  const submitForbidden = useMemo(() => {
    return status === 'submitted' || status === 'streaming';
  }, [status]);

  const doSubmit = useMemoizedFn(() => {
    if (!submitForbidden) {
      handleSubmit();
    }
  });
  const handelKeyDown = useMemoizedFn(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          return;
        } else {
          e.preventDefault();
          doSubmit();
        }
      }
    },
  );
  return (
    <div className="border-gray-300 bg-gray-100 rounded-md m-2">
      <div>
        <Textarea
          value={content}
          onChange={handleInputChange}
          onKeyDown={handelKeyDown}
          minRows={1}
          maxRows={12}
          variant="bordered"
          classNames={{
            inputWrapper: 'border-none',
          }}
          label={<div>label</div>}
          placeholder="输入问题"
        />
      </div>
      <div className="flex justify-between my-2 mx-2 text-xs">
        <span>qwen模型</span>
        <div className="flex gap-2">
          <span>Shift↩︎换行/↩︎发送</span>
          <SendHorizontal
            className={cx(
              'size-4',
              submitForbidden ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={doSubmit}
          />
        </div>
      </div>
    </div>
  );
}
