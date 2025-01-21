const hx = require("hbuilderx");

/**
 * 
 * @param context 
 */
export function registerGenerateCodeCommand(context) {
    const inlineProvider = (document, position, context, token) => {
        // 根据document和position确定上下文。
        // 传递给语言分析工具，获取返回值
        // 将返回值格式化成插件所需格式后返回。
        console.log("ss");

        return {
            items: [{
                insertText: `inse\nrtText`
            }]
        }
    }
    const InlineCompletionDisposable = hx.languages.registerInlineCompletionItemProvider(
        [{
            language: 'typescript',
        }], {
        provideInlineCompletionItems: inlineProvider
    },
    )
    context.subscriptions.push(InlineCompletionDisposable)
}