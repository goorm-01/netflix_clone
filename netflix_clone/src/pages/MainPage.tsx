import React from 'react';

import Header from '../components/Header/Header';
import TopView from '../components/TopView/TopView';
import { CardSlider } from '../components/MovieList';
import { useState, useEffect } from 'react';
import { getContentsByType } from '../api/contentsApi';
import type { Content } from '../data/content';

export default function MainPage() {
  // 카테고리별 컨텐츠 상태
  const [movies, setMovies] = useState<Content[]>([]);
  const [dramas, setDramas] = useState<Content[]>([]);
  const [animations, setAnimations] = useState<Content[]>([]);
  const [series, setSeries] = useState<Content[]>([]);

  // 컴포넌트 마운트 시 API로 Type별 컨텐츠 데이터 로드
  useEffect(() => {
    getContentsByType('movie').then(setMovies);
    getContentsByType('drama').then(setDramas);
    getContentsByType('animation').then(setAnimations);
    getContentsByType('variety').then(setSeries);
  });

  return (
    <div className='bg-[#141414] min-h-screen py-10'>
      <Header />
      <TopView />
      <CardSlider title='영화' movies={movies} />
      <CardSlider
        title='오늘 대한민국의 TOP 10 시리즈'
        movies={series.slice(0, 10)}
        variant='ranking'
      />

      <CardSlider title='드라마' movies={dramas} />
      <CardSlider title='애니메이션' movies={animations} />
    </div>
  );
}
