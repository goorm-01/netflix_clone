import { useState } from 'react';
import React from 'react';
import VideoPreview from './VideoPreview';
import MovieInfo from './MovieInfo';
import RecommendedMovies from './RecommendedMovies';
import * as Icons from '../../assets/icons';

interface ContentsDetailModalProps {
    movie: any;
    onClose: () => void;
}

export default function ContentsDetailModal({ movie, onClose }: ContentsDetailModalProps) {
    const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

    const getAgeRatingIcon = (ageRating?: number) => {
        switch (ageRating) {
            case 0: return Icons.RegionalRatingsKmrbRatingAll;
            case 12: return Icons.RegionalRatingsKmrbRating12;
            case 15: return Icons.RegionalRatingsKmrbRating15;
            case 19: return Icons.RegionalRatingsKmrbRating19;
            default: return Icons.RegionalRatingsKmrbRatingAll;
        }
    };

    const toggleAddItem = (itemId: number) => {
        setAddedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-[920px] mx-4 bg-[#181818] rounded-lg overflow-y-auto max-h-[90vh]">
                <VideoPreview 
                    movie={movie} 
                    onClose={onClose}
                    addedItems={addedItems}
                    onToggleAddItem={toggleAddItem}
                />
                
                <MovieInfo movie={movie} />
                
                <div className='px-[48px]'>
                    <RecommendedMovies 
                        addedItems={addedItems}
                        onToggleAddItem={toggleAddItem}
                        getAgeRatingIcon={getAgeRatingIcon}
                    />
                    
                    <div className='mt-8 pb-8 text-white'>
                        <h3 className='mb-5 text-[24px]'>{movie.title} 상세 정보</h3>
                        <div className="grid gap-4 text-[14px]">
                            <div className='flex gap-1'>
                                <p className="text-gray-400">감독:</p>
                                <p>{movie.creator}</p>
                            </div>
                            <div className='flex gap-1'>
                                <p className="text-gray-400">출연: </p>
                                <p>{movie.cast.join(', ')}</p>
                            </div>
                            <div className='flex gap-1'>
                                <p className="text-gray-400">각본: </p>
                            </div>
                            <div className='flex gap-1'>
                                <p className="text-gray-400">장르: </p>
                                <p>{movie.genre.join(', ')}</p>
                            </div>
                            <div className='flex gap-1'>
                                <p className="text-gray-400">영화 특징: </p>
                                <p>{movie.features.join(', ')}</p>
                            </div>
                            <div className='flex gap-2 items-center '>
                                <p className="text-gray-400">관람등급: </p>
                                <p>{getAgeRatingIcon(movie.ageRating) && React.createElement(getAgeRatingIcon(movie.ageRating), { className: 'w-[30px] h-[30px]' })}</p>
                                <p>{movie.ageRating}세이상관람가</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}