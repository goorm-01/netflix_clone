// Header.tsx
// 최상단의 메뉴바를 보여줍니다.
// 스크롤 시 배경색이 변합니다.

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from './SearchBar';

export default function Header() {
  // 버튼 상태
  const [selectedMenu, setSelectedMenu] = useState<string>('홈');

  // 호버 메뉴
  const [isHoverMenu, setIsHoverMenu] = useState<boolean>(false);

  // 마이 페이지 호버
  const [isHoverMyPage, setIsHoverMyPage] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    isSearchOpen,
    searchValue,
    shouldAnimate,
    searchContainerRef,
    handleSearchClick,
    handleSearchChange,
    handleSearchClose,
    resetSearch,
  } = useSearch();

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    navigate('/');
    resetSearch();
    setSelectedMenu('홈');
  };

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menuName: string, searchKeyword?: string) => {
    setSelectedMenu(menuName);

    if (searchKeyword) {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
    } else {
      navigate('/');
      resetSearch();
    }
  };

  return (
    // 헤더 컨테이너
    <div
      className={`w-full text-white h-[68px] flex fixed top-0 pl-[60px] pr-[60px] items-center z-[9999] bg-black transition-colors duration-500 ease-in-out`}
    >
      {/* 넷플릭스 로고 */}
      <svg
        className='mr-[25px]'
        width='93px'
        height='25px'
        viewBox='0 0 111 30'
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
        <path
          fill='#e50914'
          d='M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z'
        ></path>
      </svg>

      <div className='flex items-center justify-between w-full'>
        {/* 내비게이션 바 */}
        <ul className='hidden lg:flex columns-1 gap-[20px] items-center text-[1vw] ml-[20px] text-gray-300 cursor-pointer'>
          {/* 클릭 됐을 때 색이 변경되게 설정 */}
          <li
            onClick={() => handleMenuClick('홈')}
            className={
              selectedMenu === '홈'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            홈
          </li>
          <li
            onClick={() => handleMenuClick('시리즈', '시리즈')}
            className={
              selectedMenu === '시리즈'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            시리즈
          </li>
          <li
            onClick={() => handleMenuClick('영화', '영화')}
            className={
              selectedMenu === '영화'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            영화
          </li>
          <li
            onClick={() => handleMenuClick('게임', '게임')}
            className={
              selectedMenu === '게임'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            게임
          </li>
          <li
            onClick={() => handleMenuClick('NEW! 요즘 대세 컨텐츠', 'new')}
            className={
              selectedMenu === 'NEW! 요즘 대세 컨텐츠'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            NEW! 요즘 대세 컨텐츠
          </li>
          <li
            onClick={() => handleMenuClick('내가 찜한 리스트', '찜')}
            className={
              selectedMenu === '내가 찜한 리스트'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            내가 찜한 리스트
          </li>
          <li
            onClick={() => handleMenuClick('언어별로 찾아보기', '언어')}
            className={
              selectedMenu === '언어별로 찾아보기'
                ? 'text-white font-semibold'
                : 'hover:text-white transition-colors'
            }
          >
            언어별로 찾아보기
          </li>
        </ul>

        {/* 뷰포트에 맞게 작아지면 메뉴바 생성 */}
        <div
          className='lg:hidden relative text-[14px]'
          onMouseEnter={() => setIsHoverMenu(true)}
          onMouseLeave={() => setIsHoverMenu(false)}
        >
          <button>메뉴</button>
        </div>

        {/* 메뉴바를 호버했을 때 */}
        {isHoverMenu && (
          <div
            onMouseEnter={() => setIsHoverMenu(true)}
            onMouseLeave={() => setIsHoverMenu(false)}
          >
            <div className='top-[40px] absolute left-0 w-full h-[30px]' />
            <div className='absolute z-9999 top-[60px] left-[80px]'>
              <ul className='py-[20px] flex-col flex items-center justify-center gap-2 bg-[rgba(0,0,0,0.8)] text-white min-w-[200px] rounded'>
                <li
                  onClick={() => handleMenuClick('홈')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  홈
                </li>
                <li
                  onClick={() => handleMenuClick('시리즈', '시리즈')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  시리즈
                </li>
                <li
                  onClick={() => handleMenuClick('영화', '영화')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  영화
                </li>
                <li
                  onClick={() => handleMenuClick('게임', '게임')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  게임
                </li>
                <li
                  onClick={() =>
                    handleMenuClick('NEW! 요즘 대세 컨텐츠', 'new')
                  }
                  className='cursor-pointer hover:text-gray-300'
                >
                  NEW! 요즘 대세 컨텐츠
                </li>
                <li
                  onClick={() => handleMenuClick('내가 찜한 리스트', '찜')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  내가 찜한 리스트
                </li>
                <li
                  onClick={() => handleMenuClick('언어별로 찾아보기', '언어')}
                  className='cursor-pointer hover:text-gray-300'
                >
                  언어별로 찾아보기
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 검색, 키즈, 알림, 내정보 */}
        <div className='flex columns-1 items-center text-[14px] gap-[15px]'>
          <SearchBar
            isSearchOpen={isSearchOpen}
            searchValue={searchValue}
            shouldAnimate={shouldAnimate}
            searchContainerRef={searchContainerRef}
            onSearchClick={handleSearchClick}
            onSearchChange={handleSearchChange}
            onSearchClose={handleSearchClose}
          />

          <div>키즈</div>

          {/* 알림 아이콘 */}
          <button className='w-[36px] h-[36px] flex items-center justify-center'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.90c-.23 0-.43.15-.42.37'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>

          <div className='relative'>
            <button
              className='flex items-center columns-1'
              onMouseEnter={() => setIsHoverMyPage(true)}
              onMouseLeave={() => setIsHoverMyPage(false)}
            >
              <img
                src='./src/assets/Header/profile.png'
                className='w-[32px] h-[32px] rounded-[4px]'
                alt='Profile'
              />
              <div className='ml-[10px]'>
                <svg viewBox='0 0 16 16' width='16' height='16'>
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M11.6 6.5c.15 0 .22.18.12.28l-3.48 3.48a.33.33 0 0 1-.48 0L4.28 6.78a.17.17 0 0 1 .12-.28z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
            </button>

            {isHoverMyPage && (
              <div
                onMouseEnter={() => setIsHoverMyPage(true)}
                onMouseLeave={() => setIsHoverMyPage(false)}
              >
                {/* 호버 브릿지 */}
                <div className='absolute top-[30px] right-0 w-full h-[30px]' />

                {/* 드롭다운 메뉴 */}
                <div className='absolute top-[50px] right-[10px] bg-[rgba(20,20,20,0.95)] border border-gray-700 min-w-[200px] py-2'>
                  {/* 키즈 아이콘 */}
                  <div className='flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer'>
                    <img
                      className='profile-icon'
                      src='https://occ-0-3682-988.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABdTeFDWGGsM48NmQvPPwI9VDJ_aeLDk_7U5sowYemKcU_IW57cQR5Vn1fJU8F2tlp9Atv3V13C6rQ4-AT88O_8asZcow4xY.png?r=15b'
                      alt=''
                    ></img>
                    <span className='text-white text-[12px]'>키즈</span>
                  </div>

                  {/* 메뉴 */}
                  <div className='flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M19.121 1.707a3 3 0 0 0-4.242 0l-1.586 1.586-.707.707-11 11A2 2 0 0 0 1 16.414V21a2 2 0 0 0 2 2h4.586A2 2 0 0 0 9 22.414l11-11 .707-.707 1.586-1.586a3 3 0 0 0 0-4.242zM15.586 7 14 5.414l-11 11V19a2 2 0 0 1 2 2h2.586l11-11L17 8.414 6.707 18.707l-1.414-1.414zm.707-3.879a1 1 0 0 1 1.414 0l3.172 3.172a1 1 0 0 1 0 1.414L20 8.586 15.414 4z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <span className='text-white text-[12px]'>프로필 관리</span>
                  </div>

                  <div className='flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer'>
                    <svg
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      data-icon='ProfileArrowMedium'
                      data-icon-id=':r35:'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      role='img'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M6 1a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h3.59l-1.3 1.3 1.42 1.4 3-3a1 1 0 0 0 0-1.4l-3-3-1.42 1.4L9.6 19H6a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3v2h3a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4zm1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M18 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1.6 3.7a5 5 0 0 1-2.9.8 5 5 0 0 1-2.9-.8l-1.2 1.6a7 7 0 0 0 4.1 1.2c1.58 0 3.07-.43 4.1-1.2z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <span className='text-white text-[12px]'>프로필 이전</span>
                  </div>

                  <div className='flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 0A5 5 0 1 1 7 5a5 5 0 0 1 10 0M4 21a8 8 0 1 1 16 0v.514A68 68 0 0 1 12 22a68 68 0 0 1-8-.486zm17.15 2.378-.15-.99.151.99a1 1 0 0 0 .849-.99V21c0-5.523-4.477-10-10-10S2 15.477 2 21v1.389a1 1 0 0 0 .849.988L3 22.39c-.151.988-.15.988-.15.989h.003l.01.002.038.005.142.02q.186.027.535.072A70 70 0 0 0 12 24a70 70 0 0 0 8.422-.523q.35-.045.535-.072l.142-.02.038-.005.01-.002z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <span className='text-white text-[12px]'>계정</span>
                  </div>

                  <div className='flex items-center gap-3 px-3 py-2 hover:bg-gray-800 cursor-pointer'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 8c-1.317 0-2 .743-2 1.5H8C8 7.257 10.003 6 12 6s4 1.257 4 3.5c0 1.349-1.08 2.268-2.178 2.68-.265.1-.49.25-.636.411-.14.156-.186.292-.186.409v1h-2v-1c0-1.435 1.168-2.335 2.119-2.692.729-.274.881-.66.881-.808 0-.757-.683-1.5-2-1.5m1.5 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <span className='text-white text-[12px]'>고객 센터</span>
                  </div>

                  {/* 언더라인 */}
                  <div className='border-t border-gray-700 my-2'></div>

                  {/* 로그아웃 */}
                  <div className='px-3 py-2 text-center hover:bg-gray-800 cursor-pointer'>
                    <span className='text-white text-[12px]'>
                      넷플릭스에서 로그아웃
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
