import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchContents } from '../../api/contentsApi';
import type { Content } from '../../data/content';
import MovieCard from '../MovieList/MovieCard';
import HoverPreview from '../MovieList/HoverPreview';

// SearchResult 타입 정의
interface SearchResult {
  exactMatches: Content[];
  relatedMatches: Content[];
}

export default function SearchResult() {
  // URL에서 검색어 파라미터 추출
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  // 컴포넌트 상태 관리
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null); // 검색 결과 저장
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태

  // 영화 카드 호버 관련 상태
  const [hoveredMovie, setHoveredMovie] = useState<Content | null>(null); // 현재 호버된 영화
  const [cardPosition, setCardPosition] = useState<DOMRect | null>(null); // 호버된 카드의 위치
  const [showPreview, setShowPreview] = useState<boolean>(false); // 미리보기 표시 여부

  // 타이머 참조 (메모리 누수 방지)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 호버 지연 타이머
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // 검색 디바운스 타이머

  useEffect(() => {
    if (searchQuery) {
      // 기존 검색 타이머가 있으면 제거 (디바운스)
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // 로딩 상태 시작
      setIsLoading(true);
      
      // 300ms 디바운스 적용하여 검색 실행
      searchTimeoutRef.current = setTimeout(() => {
        searchContents(searchQuery)
          .then((result: SearchResult) => {
            setSearchResult(result); // 검색 결과 저장
            setIsLoading(false); // 로딩 종료
          })
          .catch(() => {
            setIsLoading(false); // 에러 시에도 로딩 종료
          });
      }, 300);
    } else {
      // 검색어가 없으면 결과 초기화
      setSearchResult(null);
      setIsLoading(false);
    }

    // 컴포넌트 언마운트 또는 검색어 변경 시 타이머 정리
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]); // searchQuery가 변경될 때마다 실행

  const handleCardHover = (movie: Content, rect: DOMRect) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMovie(movie);
      setCardPosition(rect);
      setShowPreview(true);
    }, 300);
  };

  const handleCardLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPreview(false);
      setHoveredMovie(null);
      setCardPosition(null);
    }, 100);
  };

  // 로딩 중일 때 렌더링
  if (isLoading) {
    return (
      <div className="mt-20">
        <div className="text-center text-white">검색 중...</div>
      </div>
    );
  }

  // 검색 결과가 있을 때 렌더링
  if (searchQuery && searchResult) {
    const { exactMatches, relatedMatches } = searchResult; // 정확한 매치와 관련 매치 분리
    const totalResults = exactMatches.length + relatedMatches.length; // 전체 결과 수

    return (
      <div className="py-8">
        {/* 검색 결과가 있는 경우 */}
        {exactMatches.length > 0 && (
          <div className="mb-8">
            {/* 영화 카드들을 그리드 레이아웃으로 표시 */}
            <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {exactMatches.map((content: Content) => (
                <MovieCard
                  key={content.id}
                  movie={content}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              ))}
            </div>
          </div>
        )}

        {/* 검색 결과가 없을 때 */}
        {totalResults === 0 && (
          <div className="flex justify-center mt-10">
            <div className='flex flex-col items-start justify-center text-center text-white'>
              {/* 검색 결과 없음 메시지 */}
              <div className="mb-2">입력하신 검색어 '{searchQuery}'(와)과 일치하는 결과가 없습니다.</div>
              
              {/* 검색 가이드 */}
              <div className='flex flex-col items-start'>
                <ul className='mb-5'>추천 검색어: </ul>
                <li className='ml-12'>다른 키워드를 입력해 보세요.</li>
                <li className='ml-12'>시리즈나 영화를 찾고 있으신가요?</li>
                <li className='ml-12'>영화 제목, 시리즈 제목, 또는 배우나 감독의 이름으로 검색해 보세요.</li>
                <li className='ml-12'>코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로 검색해 보세요.</li>
              </div>
            </div>
          </div>
        )}

        {/* 호버 미리보기 컴포넌트 */}
        {showPreview && hoveredMovie && cardPosition && (
          <HoverPreview
            movie={hoveredMovie}
            position={cardPosition}
            onMouseEnter={() => hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current)}
            onMouseLeave={() => setShowPreview(false)}
          />
        )}
      </div>
    );
  }

  // 검색어가 없거나 검색 결과가 없으면 아무것도 렌더링하지 않음
  return null;
}