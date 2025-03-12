import React from 'react';
import { Copy } from 'lucide-react';
import { BetweenHorizontalEnd } from 'lucide-react';
import { FilePlus2 } from 'lucide-react';
import { Tooltip } from '@heroui/react';
import { useMemoizedFn, useThrottleEffect } from 'ahooks';
import useSendMessage from '../../hooks/useSendMessage';
import { ExtMessageType } from '../../../utils/extType';
import { fallbackCopy } from '../../utils';

interface PreComProps {
  children: any;
}
export default function PreCom(props: PreComProps) {
  const { children } = props;
  const { sendHandler } = useSendMessage();

  const match = /language-(\w+)/.exec(children.props.className || '');
  const language = match ? match[1] : '';
  const copyHandler = () => {
    if (navigator.clipboard && document.hasFocus()) {
      navigator.clipboard
        .writeText(children.props.children)
        .then(() => console.log('复制成功！'))
        .catch((err) => {
          console.error('复制失败:', err);
          fallbackCopy(children.props.children);
        });
    } else {
      // 回退方案
      fallbackCopy(children.props.children);
    }
  };
  const insertHandler = useMemoizedFn(() => {
    sendHandler({
      type: ExtMessageType.INSERT,
      data: children.props.children,
    });
  });
  const newFileHandler = useMemoizedFn(() => {
    sendHandler({
      type: ExtMessageType.NEW_FILE,
      data: children.props.children,
    });
  });

  return (
    <div className="flex justify-between p-2 border-b-1">
      <span>{language}</span>
      <div className="flex gap-2">
        <Tooltip color="foreground" content="复制" showArrow>
          <Copy
            className="w-5 h-5 cursor-pointer hover:bg-primary-900 focus:outline-none"
            onClick={copyHandler}
          />
        </Tooltip>
        <Tooltip color="foreground" content="插入光标处" showArrow>
          <BetweenHorizontalEnd
            className="w-5 h-5 cursor-pointer hover:bg-primary-900 focus:outline-none"
            onClick={insertHandler}
          />
        </Tooltip>
        <Tooltip color="foreground" content="创建文件-暂不支持" showArrow>
          <FilePlus2
            className="w-5 h-5 cursor-not-allowed hover:bg-primary-900 focus:outline-none"
            onClick={newFileHandler}
          />
        </Tooltip>
      </div>
    </div>
  );
}
