import { isEmpty, isEqual, isUndefined, map, omitBy, toLower } from 'lodash-es';
import { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { WeatherContext } from '../../../WeatherBusiness';
import { City, List } from '../../../core/models';
import { findLocationWithSearch } from '../../../core/requests';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<List[] | undefined>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { units, setCity } = useContext(WeatherContext);
  const convertedSearchObject = map(
    omitBy(
      {
        q: searchTerm,
        units: units,
      },
      (value) => isUndefined(value) || value === null,
    ),
    (value, key) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
  ).join('&');

  const { data: response } = useQuery(
    `find-location-with-search-${convertedSearchObject}`,
    () => findLocationWithSearch(convertedSearchObject),
    {
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!searchTerm,
    },
  );

  const handleChooseCity = (city: City) => {
    setCity?.(city);
    setIsFocused(false);
  };
  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (
      (e as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' ||
      (e as React.MouseEvent<HTMLButtonElement>).type === 'click'
    ) {
      const inputValue = inputRef.current ? (inputRef.current as HTMLInputElement).value : '';
      setSearchTerm(inputValue);
      setIsFocused(true);
    }
  };

  useEffect(() => {
    if (response) {
      setData(response?.list);
    }
  }, [response]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className='w-full max-w-[465px] relative'>
      <div className='flex'>
        <input
          className='w-full rounded-l-[4px] py-1 px-4 border border-gray-200 focus:outline-none'
          placeholder='Search city'
          type='text'
          ref={inputRef}
          onKeyDown={handleOnKeyDown}
        />
        <button
          type='submit'
          className='h-[34px] border bg-gray-400 rounded-r-[4px] px-[8px] text-center hover:text-white hover:bg-blue-600'
          onClick={handleOnKeyDown}
        >
          Search
        </button>
      </div>
      {isFocused && (
        <div className='absolute top-[34px] max-h-[300px] w-full overflow-y-auto'>
          <ul className='bg-white rounded-b-[8px] border border-gray-300 shadow-sm p-4'>
            {isEmpty(data) ? (
              <div role='status' className='ms-[160px]'>
                <svg
                  aria-hidden='true'
                  className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              map(data, (dataItem, dataItemIndex) => (
                <li
                  key={dataItemIndex}
                  className='flex items-center justify-between hover:bg-slate-200 px-2 rounded-1 cursor-pointer'
                  onClick={() => {
                    handleChooseCity({ cityName: dataItem?.name, coordinates: dataItem?.coord });
                  }}
                >
                  <span className='flex items-center text-[14px] leading-[18px] max-w-[140px]'>
                    {dataItem?.name}, {dataItem?.sys?.country}
                    <img
                      src={`https://openweathermap.org/images/flags/${toLower(
                        dataItem?.sys?.country,
                      )}.png`}
                      className='w-4 h-3 ml-1'
                      alt={`${dataItem?.sys?.country} flag`}
                    />
                  </span>
                  <span className='text-[14px] leading-[18px]'>
                    {dataItem?.main?.temp?.toFixed(2)} &deg; {isEqual(units, 'metric') ? 'C' : 'F'}
                  </span>
                  <img
                    src={`http://openweathermap.org/img/wn/${dataItem?.weather?.[0]?.icon}.png`}
                    alt='weather icon'
                  />
                  <p className=' text-gray-500 text-[10px] leading-[12px]'>
                    <span>{dataItem?.coord?.lat?.toFixed(3)}</span>,{' '}
                    <span>{dataItem?.coord?.lon?.toFixed(3)}</span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
