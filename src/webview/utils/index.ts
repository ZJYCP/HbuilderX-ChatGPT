export const isDev = process.env.NODE_ENV === 'development';

export const COMMAND_LIST = [
  {
    command: '/clear',
    description: '清除当前会话',
    group: 'common',
  },
  {
    command: '/help',
    description: '学习如何使用',
    group: 'common',
  },
  {
    command: '/doc',
    description: '生成注释',
    group: 'ai',
  },
  {
    command: '/explain',
    description: '解释代码',
    group: 'ai',
  },
];
