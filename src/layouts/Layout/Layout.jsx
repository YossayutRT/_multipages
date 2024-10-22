import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

function Layout({ tab, setTab, products, carts , setToken }) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1); 
    setTab(path || 'home'); 
  }, [location, setTab]);

  return (
    <div>
      <Header />
      <Navbar tab={tab} setTab={setTab} products={products} carts={carts} setToken={setToken} />
      <hr />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
