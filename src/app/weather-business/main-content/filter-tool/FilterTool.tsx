import OtherFilter from './other-filter/OtherFilter';
import SearchInput from './search-input/SearchInput';

const FilterTool = () => {
  return (
    <div className='w-full bg-[#f2f2f2]'>
      <div className='flex flex-col md:flex-row container space-y-[16px] md:space-y-0 md:justify-between md:items-center md:mx-auto p-4'>
        <SearchInput />
        <OtherFilter />
      </div>
    </div>
  );
};

export default FilterTool;
