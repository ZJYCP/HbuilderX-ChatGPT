import * as fs from 'fs';
import * as path from 'path';
import { GLOBAL_CONFIG_PATH } from './tools';

/**
 * 简单的本地 JSON 数据存储工具
 */
class LocalDB<T> {
  private filePath: string;
  public data: T;

  constructor(filePath: string, defaultData: T) {
    this.filePath = filePath;
    this.data = defaultData;

    this.ensureFileExists();
    this.read();
  }

  private ensureFileExists() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      this.write(this.data);
    }
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      if (content) {
        this.data = JSON.parse(content);
      }
    } catch (err) {
      console.error('读取文件失败，使用默认数据:', err.message);
      this.write(this.data);
    }
  }

  write(data: T) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      this.data = data;
    } catch (err) {
      console.error('写入文件失败:', err.message);
    }
  }

  update(fn: (data: T) => void) {
    fn(this.data);
    this.write(this.data);
  }

  get(): T {
    return this.data;
  }
}

function createLocalDB<T>(filePath: string, defaultData: T) {
  return new LocalDB(filePath, defaultData);
}

const db = createLocalDB(GLOBAL_CONFIG_PATH + '/pref.json', {
  userInfo: null,
  token: '',
});

export default db;
