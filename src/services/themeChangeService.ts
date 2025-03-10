/**
 * 监听IDE主题切换
 */

import { WebviewMessageType } from '../utils/extType';
import getHBuilderXThemeData from '../utils/theme';
import WebBridge from './webBridge';

const hx = require('hbuilderx');

const themeChangeService = () => {
  let configurationChangeDisplose = hx.workspace.onDidChangeConfiguration(
    function (event) {
      if (
        event.affectsConfiguration('editor.colorScheme') ||
        event.affectsConfiguration('editor.fontSize') ||
        event.affectsConfiguration('editor.fontFamily')
      ) {
        let ThemeColorData = getHBuilderXThemeData();
        WebBridge.getInstance().postMessage({
          type: WebviewMessageType.THEME,
          data: ThemeColorData,
        });
      }
    },
  );
  return configurationChangeDisplose;
};

export default themeChangeService;
