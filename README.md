# HBuilderX ChatGPT代码助手

![image-20230325233146483](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230325233146483.png)

## feature

- 使用最新的ChatGPT模型对代码进行优化
- 可以采用Api-key或AccessToken进行访问

![image-20230325232822997](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230325232822997.png)

## 开始
1. 你需要拥有一个openAI账号，拥有一个能访问ChatGPT的网络环境
2. 获取accessToken或ApiKey
  1. AccessToken可以在登入Chatgpt网页([New chat (openai.com)](https://chat.openai.com/chat))后打开`https://chat.openai.com/api/auth/session`,会以json的形式返回本次的AccessToken，有效期大概一个月。
  2. ApiKey直接在OpenAI的管理平台开通（[Account API Keys - OpenAI API](https://platform.openai.com/account/api-keys)）


3. 关于两者的区别

   **还是建议使用AccessToken**

​		通过Apikey进行调用: 付费，对网络环境要求较高，需要设置proxy，容易被ban

​		通过AccessToken：实际上是网页版Chatgpt的一个反向代理，所以在网页端也能看到提问的记录。免费，但对发送的频率有限制(5 req / 10 seconds by IP)，可以不需要自己的网络代理。

4. 设置Api / token， 

![image-20230325233310464](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230325233310464.png)

![image-20230325233237946](https://blog-1252832257.cos.ap-shanghai.myqcloud.com/image-20230325233237946.png)

## TODO
- 多模型选择
- webview界面优化
- 自定义对话输入
- ......

## 声明

1. 作者不能保证这个扩展会一直正常工作，没有任何问题或不良影响。请自行决定是否使用，风险自负。
2. 此插件不会使用/存储您的个人身份信息。
3. 作者不对您使用此插件所遇到的任何问题承担责任。您使用OpenAI服务需要遵守OpenAI的隐私政策和使用条款。
