/// <reference types="react" />

import { IWebviewMessage } from './src/utils/extType';

declare module '*.scss' {
  const content: { readonly [className: string]: string };
  export default content;
}

// global.d.ts
declare const hbuilderx: any;
