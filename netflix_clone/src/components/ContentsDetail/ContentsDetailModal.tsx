import { useState } from 'react';
import VideoPreview from './VideoPreview';
import MovieInfo from './MovieInfo';
import RecommendedMovies from './RecommendedMovies';

interface ContentsDetailModalProps {
    movie: any;
    onClose: () => void;
}

export default function ContentsDetailModal({ movie, onClose }: ContentsDetailModalProps) {
    const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

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
                    />
                </div>
            </div>
        </div>
    );
}