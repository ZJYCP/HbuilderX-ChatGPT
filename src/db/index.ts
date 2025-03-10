/**
 * 本地数据库
 */
import { JSONFileSyncPreset } from 'lowdb/node';
import { GLOBAL_CONFIG_PATH } from './tools';

const defaultData = { user: {}, token: '' };
const db = JSONFileSyncPreset(GLOBAL_CONFIG_PATH, defaultData);

export default db;
