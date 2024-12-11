import FilterTool from './filter-tool/FilterTool';
import Result from './result/Result';

const MainContent = () => {
  return (
    <main className='flex flex-col py-4 w-full space-y-[32px]'>
      <FilterTool />
      <div className='md:container w-full md:mx-auto px-4'>
        <Result />
      </div>
    </main>
  );
};

export default MainContent;
