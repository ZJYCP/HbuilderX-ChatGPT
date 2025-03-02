import React from 'react';
import HeaderCom from '../header';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="mx-1 pb-2  h-screen flex flex-col overflow-hidden">
      <HeaderCom></HeaderCom>
      <main className="flex-1">{children}</main>
    </div>
  );
}
