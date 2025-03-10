import { useUserStore } from '../store';

export interface WebviewMessageHandler {
  handler(data: any): void;
}

export class TokenHandler implements WebviewMessageHandler {
  handler(data: any) {
    const { setToken } = useUserStore();
    setToken(data);
  }
}
