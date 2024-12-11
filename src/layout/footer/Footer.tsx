const Footer = () => {
  return (
    <footer className='bg-blue-200 py-8'>
      <div className='md:container md:mx-auto px-4 flex md:flex-row md:justify-between flex-col space-y-[16px] md:space-y-0'>
        <div className='flex flex-col space-y-[16px]'>
          <p className='text-[18px] leading-[23px] font-bold'>Product Collections</p>
          <ul className='flex flex-col space-y-[16px] text-[14px] text-gray-500'>
            <li>Product Categories</li>
            <li>Product Brands</li>
            <li>Product Tags</li>
          </ul>
        </div>
        <div className='flex flex-col space-y-[16px]'>
          <p className='text-[18px] leading-[23px] font-bold'>Subscriptions</p>
          <ul className='flex flex-col space-y-[16px] text-[14px] text-gray-500'>
            <li>How to start</li>
            <li>How to cancel</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
