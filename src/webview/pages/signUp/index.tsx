import { Input, Button, Card, Spacer } from '@heroui/react';
import { useState } from 'react';
import request from '../../utils/request';
import { useNavigate } from 'react-router';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const res = await request({
        url: '/auth/signup',
        method: 'POST',
        data: { email, password },
      });
      console.log('注册成功', res);
    } catch (error) {
      console.error('注册失败', error);
    }
  };

  return (
    <div className="flex items-center justify-center  h-full from-blue-50 to-purple-50">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-lg bg-primary-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          用户注册
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
          onPress={handleSignUp}
        >
          注册
        </Button>

        <Spacer y={1} />

        <div className="text-center text-sm text-gray-500">
          已有账号？{' '}
          <span
            onClick={() => {
              // 跳转注册页面
              navigate('/signin');
            }}
            className="text-blue-500 cursor-pointer"
          >
            立即登录
          </span>
        </div>
      </Card>
    </div>
  );
}
