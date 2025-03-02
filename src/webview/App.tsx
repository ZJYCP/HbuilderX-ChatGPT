import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router';

const Login = React.lazy(() => import('./pages/login'));
const Logout = React.lazy(() => import('./pages/logout'));
const Home = React.lazy(() => import('./pages/home'));
export default function App() {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
