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
      <div className='relative top-[68px] w-full h-[55vw] mb-[100px] flex items-center justify-center overflow-hidden'>
        {randomMovie && randomMovie.previewLink && (
          <iframe
            src={getEmbedUrl(randomMovie.previewLink)}
            className='w-full h-full object-cover'
            allow='autoplay; encrypted-media'
            frameBorder='0'
          ></iframe>
        )}
      </div>
    </>
  );
}
