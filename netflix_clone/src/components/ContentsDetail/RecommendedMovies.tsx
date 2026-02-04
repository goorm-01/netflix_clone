import { useState } from 'react';
import React from 'react';
import * as Icons from '../../assets/icons';
import moviesData from '../../data/dummy-data.json';

interface RecommendedMoviesProps {
    addedItems: Set<number>;
    onToggleAddItem: (id: number) => void;
    getAgeRatingIcon: (ageRating?: number) => any;
}

export default function RecommendedMovies({ addedItems, onToggleAddItem, getAgeRatingIcon }: RecommendedMoviesProps) {
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="relative mt-8">
            <h2 className="text-[rgb(255,255,255)] text-[24px] font-normal mb-5">함께 시청된 콘텐츠</h2>
            <div className="grid grid-cols-3 gap-5">
                {moviesData.movies.slice(0, showAll ? moviesData.movies.length : 9).map((item) => (
                    <div key={item.id} className="cursor-pointer rounded bg-[rgb(47,47,47)] text-[rgb(210,210,210)] overflow-hidden">
                        <div className="relative">
                            <img src={item.backdropUrl} alt={item.title} className="w-full " />
                            <div className='absolute inset-0' style={{ background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
                            <span className='absolute top-2 right-2 text-white px-2 py-1 text-[16px]'>{Math.floor(item.runningTime / 60)}시간 {item.runningTime % 60}분</span>
                        </div>
                        <div className='p-[16px] text-[16px] font-light flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p>{getAgeRatingIcon(item.ageRating) && React.createElement(getAgeRatingIcon(item.ageRating), { className: 'w-[30px] h-[30px]' })}</p>
                                <span>{item.releaseYear}</span>
                            </div>
                            <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15" aria-label="찜하기" onClick={() => onToggleAddItem(item.id)}>
                                {addedItems.has(item.id) ?
                                    <Icons.CheckmarkMedium className="w-[17px] h-[17px]" /> :
                                    <Icons.PlusMedium className="w-[17px] h-[17px]" />
                                }
                            </button>
                        </div>
                        <div className='px-[14px] pb-[16px] text-[14px] font-extralight'>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {moviesData.movies.length > 9 && (
                <div className="relative flex items-center justify-center">
                    <div className="absolute mb-[60px] inset-x-0 h-16 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30" />
                    <button onClick={() => setShowAll(!showAll)} className="z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-gray-400 bg-black/30 text-white hover:border-gray-300">
                        {showAll ? (
                            <Icons.ChevronUpMedium className="w-[18px] h-[18px]" />
                        ) : (
                            <Icons.ChevronDownMedium className="w-[18px] h-[18px]" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}