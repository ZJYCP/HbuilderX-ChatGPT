import { HOST } from '../utils';
import db from '../db';
const hx = require('hbuilderx');

const fetchCode = async (language, fileName, prev, after) => {
  const res = await fetch(`${HOST}/llm/codeComplete`, {
    method: 'POST',
    body: JSON.stringify({
      language,
      fileName,
      prev,
      after,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${db.data.token}`,
    },
  });
  const code = res.text();
  return code;
};

/**
 *
 * @param context
 */
export function registerGenerateCodeCommand(context) {
  let cancelToken;
  if (!db.data.token) {
    hx.window.showInformationMessage('请先在打开Articode面板并登录');
  }
  const inlineProvider = async (document, position, context, token) => {
    if (!db.data.token) {
      return null;
    }
    const language = document.languageId;
    const fileName = document.fileName;
    /**
     * 根据position取得光标前和光标后的代码
     */
    // 获取光标前的代码
    const codeBefore = document.getText(
      new hx.Range(new hx.Position(0, 0), position),
    );

    // 获取光标后的代码
    const lastLine = document.lineCount - 1;
    const lastLineEnd = document.lineAt(lastLine).range.end;
    const rangeAfterCusor = new hx.Range(position, lastLineEnd);
    const codeAfter = document.getText(rangeAfterCusor);

    const code = await fetchCode(language, fileName, codeBefore, codeAfter);

    return {
      items: [
        {
          insertText: code,
        },
      ],
    };
  };
  const InlineCompletionDisposable =
    hx.languages.registerInlineCompletionItemProvider([{ pattern: '**' }], {
      provideInlineCompletionItems: inlineProvider,
    });
  context.subscriptions.push(InlineCompletionDisposable);
}
