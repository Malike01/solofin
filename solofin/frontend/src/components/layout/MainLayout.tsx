import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LazyLoader from '../LazyLoader';

export const MainLayout = () => {
  return (
    <div>
      <nav style={{ background: '#eee', padding: '1rem' }}>
       Public - Navbar
      </nav>
      
      <main style={{ padding: '2rem' }}>
        <Suspense fallback={<LazyLoader/>}>      
          <Outlet/>       
         </Suspense>
      </main>
      
      {/* <Footer /> */}
    </div>
  );
};