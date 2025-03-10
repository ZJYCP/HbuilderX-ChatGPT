import { Input, Button, Card, Spacer } from '@heroui/react';
import { useState } from 'react';
import request from '../../utils/request';
import { useNavigate } from 'react-router';
import useSendMessage from '../../hooks/useSendMessage';
import { ExtMessageType } from '../../../utils/extType';
import { useUserStore } from '../../store';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { sendHandler } = useSendMessage();
  const userState = useUserStore();

  const navigate = useNavigate();

  const handleLogin = async () => {
    // 这里可以调用您的request工具进行登录请求
    console.log('登录中...', { email, password });
    const res = await request({
      url: '/auth/login',
      method: 'POST',
      data: {
        email,
        password,
      },
    });
    console.log(res);

    const token = res.data.token;
    sendHandler({
      type: ExtMessageType.SIGNIN,
      data: {
        token,
      },
    });
    userState.setToken(token);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-full  from-blue-50 to-purple-50">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-primary-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          用户登录
        </h1>

        <Input
          label="邮箱"
          placeholder="请输入您的邮箱"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Input
          type="password"
          label="密码"
          placeholder="请输入您的密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />

        <Button
          color="primary"
          size="lg"
          className="w-full"
          onPress={handleLogin}
        >
          登录
        </Button>

        <Spacer y={1} />

        <div className="text-center text-sm text-gray-500">
          还没有账号？{' '}
          <span
            onClick={() => {
              // 跳转注册页面
              navigate('/signUp');
            }}
            className="text-blue-500 cursor-pointer"
          >
            立即注册
          </span>
        </div>
      </Card>
    </div>
  );
}
