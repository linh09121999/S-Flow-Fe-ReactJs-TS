import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, Navigate, Outlet, BrowserRouter } from 'react-router-dom';

import { Footer, Header, BackToTop } from './components';

const Home = React.lazy(() => import('./view/home'));
const Universal = React.lazy(() => import('./view/universal'));
const UniversalDetail = React.lazy(() => import('./view/universalDetail'));

const ProtectedRoute: React.FC = () => {
  // const { isMobile } = useGlobalContext();
  return (
    <div className="flex flex-col w-full h-full bg-slate-950">
      {/* <!-- Header --> */}
      <BackToTop />
      <Header />
      <main className='min-h-[80vh] p-5'>
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path='/universal' element={<Universal/>}/>
            <Route path='/universal-detail' element={<UniversalDetail/>}/>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
};

export default App
