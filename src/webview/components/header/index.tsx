import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Layout, Menu, Dropdown, Avatar, Button, message } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const HeaderCom: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('用户名');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 模拟登录逻辑
    setIsLoggedIn(true);
    setUsername('张三');
    message.success('登录成功');
  };

  const handleLogout = () => {
    // 模拟登出逻辑
    setIsLoggedIn(false);
    setUsername('');
    message.success('登出成功');
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="flex justify-between items-center bg-white border-b-white">
      <div className={styles.logo}>ArtiCode</div>
      <div className={styles.buttons}>
        {isLoggedIn ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
            <span>{username}</span>
          </Dropdown>
        ) : (
          <>
            <Link to="/signIn" className={styles.button}>
              <Button type="link" icon={<LoginOutlined />}>
                登录
              </Button>
            </Link>
            <Link to="/signUp" className={styles.button}>
              <Button type="link" icon={<UserOutlined />}>
                注册
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default HeaderCom;
