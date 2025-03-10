import React from 'react';
import HeaderCom from '../header';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HeaderCom></HeaderCom>
      <section
        className="flex-1 flex flex-col"
        style={{ maxHeight: 'calc(100% - 2rem)' }}
      >
        {children}
      </section>
    </div>
  );
}
