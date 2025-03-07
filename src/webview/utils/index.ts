// 后端接口host地址，根据环境判断
export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://backend.fcv3.1754953544581946.cn-hangzhou.fc.devsapp.net';
