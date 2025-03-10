import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  materialDark,
  solarizedlight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import PreCom from './PreCom';
import { useSystemStore } from '../../store';
import styles from './index.module.scss';
import cx from 'classnames';
import { useMemo } from 'react';
export default function MarkdownCom(props: any) {
  const { systemInfo } = useSystemStore();

  const codeStyle = useMemo(() => {
    switch (systemInfo.theme) {
      case 'dark':
        return materialDark;
      case 'light':
        return solarizedlight;
      case 'monokai':
        return materialDark;
      default:
        return materialDark;
    }
  }, [systemInfo.theme]);

  return (
    <Markdown
      children={props.children}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children }) => (
          <pre className={cx('bg-primary-700 rounded', styles.markdownWrapper)}>
            <PreCom>{children}</PreCom>
            {children}
          </pre>
        ),
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={codeStyle}
              customStyle={{ background: 'hsl(var(--heroui-primary-700))' }}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    ></Markdown>
  );
}
