import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchSuggestions() {
  const navigate = useNavigate();

  // 추천 키워드 풀
  const suggestionPool = {
    types: ['영화', '드라마', '애니메이션', '예능'],
    genres: [
      '코미디', '로맨스', '액션', 'SF', '스릴러', '미스터리', 
      '애니메이션', '음악', '가족', '범죄', '판타지', '시대물'
    ],
    keywords: [
      '한국 작품', '미국 작품', '일본 작품', '감동적인', '재밌는',
      '힐링', '로맨틱', '흥미진진', '감상적', '유쾌 발랄',
      '어두운', '긴장감 넘치는', '상상의 나래', '진심 어린'
    ],
    actors: [
      '송강호', '이병헌', '김혜자', '박보영', '신혜선', 
      '황정민', '김태리', '아이유', '박보검', '레오나르도 디카프리오'
    ]
  };

  // 랜덤으로 6개 선택하는 함수
  const getRandomSuggestions = (): string[] => {
    const allSuggestions: string[] = [
      ...suggestionPool.types,
      ...suggestionPool.genres,
      ...suggestionPool.keywords,
      ...suggestionPool.actors
    ];

    // 배열을 섞고 6개만 선택
    const shuffled = allSuggestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  };

  // useState 초기값으로 설정
  const [suggestions] = useState<string[]>(() => getRandomSuggestions());

  // 추천 검색어 클릭 핸들러
  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className='flex text-[16px] mt-24 items-center'>
      <div className='flex items-center text-[#ffffff80] mr-3'>
        더 다양한 검색어가 필요하시다면!:
      </div>
      <div className='flex flex-wrap gap-0'>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`text-[#fff] cursor-pointer hover:text-[#e50914] transition-colors
              ${index < suggestions.length - 1 ? 'px-2 border-r-[#ffffff80] border-r-[1px]' : 'pl-2'}
            `}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}