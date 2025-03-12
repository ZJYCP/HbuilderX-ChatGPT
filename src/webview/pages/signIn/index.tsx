import { Input, Button, Card, Spacer, Spinner } from '@heroui/react';
import { useState } from 'react';
import request from '../../utils/request';
import { useNavigate } from 'react-router';
import useSendMessage from '../../hooks/useSendMessage';
import { ExtMessageType } from '../../../utils/extType';
import { useUserStore } from '../../store';
import cx from 'classnames';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { sendHandler } = useSendMessage();
  const userState = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    console.log('登录中...', { email, password });
    try {
      const res = await request({
        url: '/auth/login',
        method: 'POST',
        data: {
          email,
          password,
        },
      });
      console.log(res);
      setLoading(false);

      const token = res.data.access_token;
      sendHandler({
        type: ExtMessageType.SIGNIN,
        data: {
          token,
        },
      });
      userState.setToken(token);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError('登录失败，请检查您的邮箱和密码是否正确');
    }
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
        {!!error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <Button
          color="primary"
          size="lg"
          className={cx('w-full', { 'cursor-not-allowed': loading })}
          onPress={handleLogin}
        >
          {loading && <Spinner size="sm" color="success" className="mr-2" />}
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
