import Header from './header/Header';
import { Outlet } from 'react-router-dom';

const InternalLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default InternalLayout;
