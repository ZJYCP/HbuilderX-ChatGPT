// 定义请求配置接口
interface RequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
}

// 请求拦截器，可用于添加统一的请求头
const requestInterceptor = (config: RequestConfig): RequestConfig => {
  // 示例：添加统一的请求头
  const headers = {
    ...config.headers,
    'Content-Type': 'application/json',
  };
  return {
    ...config,
    headers,
  };
};

// 响应拦截器，可用于处理统一的响应逻辑
const responseInterceptor = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    // 示例：处理响应错误
    throw new Error(`请求失败，状态码: ${response.status}`);
  }
  return response;
};

// 封装的 fetch 方法
const fetchWrapper = async (config: RequestConfig) => {
  // 执行请求拦截器
  const interceptedConfig = requestInterceptor(config);

  try {
    // 发起请求
    const response = await fetch(interceptedConfig.url, {
      method: interceptedConfig.method || 'GET',
      headers: interceptedConfig.headers,
      body: interceptedConfig.body,
    });

    // 执行响应拦截器
    const interceptedResponse = await responseInterceptor(response);

    return interceptedResponse;
  } catch (error) {
    // 处理请求错误
    console.error('请求发生错误:', error);
    throw error;
  }
};

export default fetchWrapper;
