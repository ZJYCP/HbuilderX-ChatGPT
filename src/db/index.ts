/**
 * 本地数据库
 */
import { GLOBAL_CONFIG_PATH } from './tools';
const fs = require('fs');

// 如果该文件不存在，则创建，包括上级文件夹
if (!fs.existsSync(GLOBAL_CONFIG_PATH)) {
  fs.mkdirSync(GLOBAL_CONFIG_PATH, { recursive: true });
}

let db;

export default db;
