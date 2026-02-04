// TopView.tsx
// 최상단에 랜덤으로 영상을 보여줍니다.
// 반응형을 위해 글자의 경우 vw 단위를 사용했습니다.
import React from 'react';
import { getContents } from '../../api/contentsApi';
import { useEffect, useState } from 'react';
import type { Content } from '../../data/content';

export default function TopView() {
  const [randomMovie, setRandomMovie] = useState<Content>();

  useEffect(() => {
    // 컨텐츠를 골라서 랜덤된 데이터를 결정
    async function getMovieContents() {
      const response = await getContents();

      // 랜덤으로 하나 선택
      if (response.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.length);
        setRandomMovie(response[randomIndex]);
      }
    }
    getMovieContents();
  }, []);
  // 유튜브 임베드 URL 생성
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  };

  return (
    <>
      <div className='relative w-full h-[55vw] mt-[-40px] mb-[-200px] flex items-start justify-center overflow-hidden'>
        {randomMovie && randomMovie.previewLink && (
          <iframe
            src={getEmbedUrl(randomMovie.previewLink)}
            className='w-full h-full object-cover'
            allow='autoplay; encrypted-media'
          ></iframe>
        )}
        {randomMovie && (
          <div className='absolute bottom-[30%] left-[60px] z-10 max-w-[40%]'>
            <h1 className='text-white text-[1.6vw] mb-4'>
              {randomMovie.title}
            </h1>
            <p className='text-white text-[1.2vw] leading-relaxed line-clamp-3'>
              {randomMovie.description}
            </p>
            <div className='flex gap-4 mt-6'>
              <button className='bg-white text-black px-8 py-2 rounded text-[1vw] hover:bg-opacity-80'>
                ▶ 재생
              </button>
              <button className='bg-gray-500 bg-opacity-70 text-white px-8 py-2 rounded text-[1vw] hover:bg-opacity-50'>
                ⓘ 상세 정보
              </button>
            </div>
          </div>
        )}
        <div className='absolute bottom-0 left-0 w-full h-[10vw] bg-gradient-to-t from-black to-transparent pointer-events-none'></div>
      </div>
    </>
  );
}
