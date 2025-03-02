import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import Layout from './components/layout';

const SignIn = React.lazy(() => import('./pages/signIn'));
const SignUp = React.lazy(() => import('./pages/signUp'));
const Home = React.lazy(() => import('./pages/home'));
export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Layout>
      </Suspense>
    </HashRouter>
  );
}
