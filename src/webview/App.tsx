import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import Layout from './components/layout';
import { useSystemStore } from './store';

const SignIn = React.lazy(() => import('./pages/signIn'));
const SignUp = React.lazy(() => import('./pages/signUp'));
const Home = React.lazy(() => import('./pages/home'));
export default function App() {
  const { systemInfo } = useSystemStore();

  return (
    <HashRouter>
      <main className={`${systemInfo.theme} text-foreground bg-background`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Routes>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </Layout>
        </Suspense>
      </main>
    </HashRouter>
  );
}
