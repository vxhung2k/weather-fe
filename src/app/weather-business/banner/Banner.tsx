const Banner = () => {
  return (
    <div className="bg-[url('/bg.png')] min-w-[250px] min-h-[250px] bg-cover bg-center">
      <div className='flex flex-col h-full justify-center space-y-[16px] ms-4 mt-[50px]'>
        <h1 className='text-[32px] text-orange-600 leading-[40px] md:ms-[120px]'>
          My Weather Website
        </h1>
        <h2 className='text-[24px] leading-[30px] text-white md:ms-[120px]'>
          Weather forecasts, nowcasts and history in a fast and elegant way
        </h2>
      </div>
    </div>
  );
};

export default Banner;
