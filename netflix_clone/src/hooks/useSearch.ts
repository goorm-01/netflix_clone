import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false); // 검색창 열림/닫힘
  const [searchValue, setSearchValue] = useState<string>(''); // 현재 입력값
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false); // 애니메이션 플래그
  
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 디바운스 타이머
  const searchContainerRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지용
  
  const navigate = useNavigate();
  const location = useLocation();

  // URL → 검색 상태 동기화
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    const searchMode = params.has('search');
    
    setSearchValue(query); // 검색어를 input에 동기화
    
    if (query || searchMode) {
      setIsSearchOpen(true);
      setShouldAnimate(false); // URL 변경 시엔 애니메이션 X
    }
  }, [location]);

  // 검색창 닫기
  const handleSearchClose = () => {
    setSearchValue('');
    setIsSearchOpen(false);
    setShouldAnimate(false);
    navigate('/');
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // 검색 버튼 클릭 핸들러
  const handleSearchClick = () => {
    if (!isSearchOpen) {
      setShouldAnimate(true);
      setIsSearchOpen(true);
      navigate('/?search=true');
    }
  };

  // 실시간 검색 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // 기존 타이머 취소 (디바운스)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // 300ms 후에 URL 변경
    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value)}`); // 검색 페이지로
      } else {
        navigate('/?search=true');
      }
    }, 300);
  };

  // 검색 초기화
  const resetSearch = () => {
    setSearchValue('');
    setIsSearchOpen(false);
    setShouldAnimate(false);
  };

  return {
    isSearchOpen,
    searchValue,
    shouldAnimate,
    searchContainerRef,
    handleSearchClick,
    handleSearchChange,
    handleSearchClose,
    resetSearch,
  };
}