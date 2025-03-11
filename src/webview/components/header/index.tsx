import React, { useEffect, useMemo } from 'react';
import { useUserStore } from '../../store';
import { useNavigate } from 'react-router';
import { useMemoizedFn } from 'ahooks';
import request from '../../utils/request';

export default function HeaderCom() {
  const userState = useUserStore();
  const navigate = useNavigate();

  const hasLogin = useMemo(() => {
    return !!userState.token && userState.userInfo;
  }, [userState]);

  useEffect(() => {
    const fetchInfo = async () => {
      if (!userState.userInfo) {
        const userInfo = (
          await request({
            url: '/users/userInfo',
            method: 'GET',
          })
        ).data;
        userState.setUserInfo(userInfo);
      }
    };
    fetchInfo();
  }, [userState.token]);

  return (
    <div className="h-8 flex justify-between items-center mx-1">
      <span className="font-bold">ArtiCode</span>
      {hasLogin ? (
        <div>{userState.userInfo?.email}</div>
      ) : (
        <div className="flex gap-2">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate('/signin');
            }}
          >
            登录
          </span>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate('/signup');
            }}
          >
            注册
          </span>
        </div>
      )}
    </div>
  );
}
