import React from 'react';
import HeaderCom from '../header';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="bg-gray-900 h-screen flex flex-col overflow-hidden">
      <HeaderCom></HeaderCom>
      <main
        className="flex-1 flex flex-col"
        style={{ maxHeight: 'calc(100% - 2rem)' }}
      >
        {children}
      </main>
    </div>
  );
}
