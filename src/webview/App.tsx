import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

const Login = React.lazy(() => import('./pages/login'));
const Logout = React.lazy(() => import('./pages/logout'));
const Home = React.lazy(() => import('./pages/home'));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
