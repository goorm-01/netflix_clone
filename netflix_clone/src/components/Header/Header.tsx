// Header.tsx
// 최상단의 메뉴바를 보여줍니다.
// 스크롤 시 배경색이 변합니다.
import React from 'react';
import { useState, useEffect } from 'react';

export default function Header() {
  // 스크롤 상태
  const [isScrolled, setIsScrolled] = useState(false);

  // 버튼 상태
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // 스크롤 이벤트 리스너를 등록, 스크롤이 되는 것을 확인
    window.addEventListener('scroll', handleScroll);

    // 언마운트 됐을 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // 헤더 컨테이너
    <div
      className={`w-full text-white h-[68px] flex fixed top-0 pl-[60px] pr-[60px] items-center z-[9999] ${isScrolled ? 'bg-black' : 'bg-[rgba(0,0,0,0)]'} transition-colors duration-500 ease-in-out`}
    >
      {/* 넷플릭스 로고 */}
      <svg
        className='mr-[25px]'
        width='93px'
        height='25px'
        viewBox='0 0 111 30'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='#e50914'
          d='M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z'
        ></path>
      </svg>

      <div className='flex justify-between w-full items-center'>
        {/* 내비게이션 바 */}
        <li className='flex columns-1 gap-[20px] items-center text-[1vw] ml-[20px] text-gray-300 cursor-pointer'>
          <ul
            onClick={() => setSelectedMenu('홈')}
            className={selectedMenu === '홈' ? 'text-white font-semibold' : ''}
          >
            홈
          </ul>
          <ul
            onClick={() => setSelectedMenu('시리즈')}
            className={
              selectedMenu === '시리즈' ? 'text-white font-semibold' : ''
            }
          >
            시리즈
          </ul>
          <ul
            onClick={() => setSelectedMenu('영화')}
            className={
              selectedMenu === '영화' ? 'text-white font-semibold' : ''
            }
          >
            영화
          </ul>
          <ul
            onClick={() => setSelectedMenu('게임')}
            className={
              selectedMenu === '게임' ? 'text-white font-semibold' : ''
            }
          >
            게임
          </ul>
          <ul
            onClick={() => setSelectedMenu('NEW! 요즘 대세 컨텐츠')}
            className={
              selectedMenu === 'NEW! 요즘 대세 컨텐츠'
                ? 'text-white font-semibold'
                : ''
            }
          >
            NEW! 요즘 대세 컨텐츠
          </ul>
          <ul
            onClick={() => setSelectedMenu('내가 찜한 리스트')}
            className={
              selectedMenu === '내가 찜한 리스트'
                ? 'text-white font-semibold'
                : ''
            }
          >
            내가 찜한 리스트
          </ul>
          <ul
            onClick={() => setSelectedMenu('언어별로 찾아보기')}
            className={
              selectedMenu === '언어별로 찾아보기'
                ? 'text-white font-semibold'
                : ''
            }
          >
            언어별로 찾아보기
          </ul>
        </li>
        {/* 검색, 키즈, 알림, 내정보 */}
        <div className='flex columns-1 items-center text-[14px] gap-[15px]'>
          {/* 검색 아이콘 */}
          <button className='w-[36px] h-[36px] flex items-center justify-center'>
            <svg
              viewBox='0 0 24 24'
              width='24'
              height='24'
              data-icon='MagnifyingGlassMedium'
              data-icon-id=':r0:'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              role='img'
            >
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <div>키즈</div>
          {/* 알림 아이콘 */}
          <button className='w-[36px] h-[36px] flex items-center justify-center'>
            <svg
              viewBox='0 0 24 24'
              width='24'
              height='24'
              data-icon='BellMedium'
              data-icon-id=':r1:'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              role='img'
            >
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <button className='flex columns-1 items-center'>
            <img
              src='./src/assets/Header/profile.png'
              className='w-[32px] h-[32px] rounded-[4px]'
            ></img>
            <div className='ml-[10px]'>
              <svg
                viewBox='0 0 16 16'
                width='16'
                height='16'
                data-icon='CaretDownSmall'
                data-icon-id=':rn:'
                data-uia='account+header+menu+Icon'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                role='img'
              >
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M11.6 6.5c.15 0 .22.18.12.28l-3.48 3.48a.33.33 0 0 1-.48 0L4.28 6.78a.17.17 0 0 1 .12-.28z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
