import Footer from './footer/Footer';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';

const InternalLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default InternalLayout;
