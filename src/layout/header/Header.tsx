import React from 'react';

const Header = () => {
  return (
    <header className='flex sticky bg-blue-300 px-8 py-4'>
      <img
        src='https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png'
        alt='logo'
        className='w-[100px] h-[50px]'
      />
    </header>
  );
};

export default Header;
