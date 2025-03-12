import { HOST } from '../utils';
import db from '../db';
const hx = require('hbuilderx');
import debounce from 'lodash/debounce';
const fetchCode = async (language, fileName, prev, after) => {
  console.log('触发网络请求');
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
      Authorization: `Bearer ${db.get().token}`,
    },
  });
  if (res.ok) {
    const code = (await res.json()).data;
    return code;
  } else {
    return null;
  }
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
    if (cancelToken && !cancelToken.isCancellationRequested) {
      cancelToken.cancel();
      console.log('取消上次请求');
    }
    cancelToken = token;
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

    if (token.isCancellationRequested) {
      console.log('本次补全在网络请求前被取消');
      return null;
    }
    console.log('触发了', codeBefore.slice(-5));
    const code = await fetchCode(language, fileName, codeBefore, codeAfter);
    console.log(code);

    if (token.isCancellationRequested) {
      console.log('本次补全在网络请求后被取消');
      return null;
    }

    return {
      items: [
        {
          insertText: code,
        },
      ],
    };
  };

  const throttleProvider = debounce(inlineProvider, 1000, {
    leading: false, // 确保第一次调用立即执行
    trailing: true, // 确保最后一次调用在节流结束后执行
  });
  // 我想做防抖，做不到啊
  const InlineCompletionDisposable =
    hx.languages.registerInlineCompletionItemProvider([{ pattern: '**' }], {
      provideInlineCompletionItems: inlineProvider,
    });
  context.subscriptions.push(InlineCompletionDisposable);
}
