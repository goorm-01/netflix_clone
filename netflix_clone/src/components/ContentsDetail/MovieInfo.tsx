import * as Icons from '../../assets/icons';

interface MovieInfoProps {
    movie: any;
}

export default function MovieInfo({ movie }: MovieInfoProps) {
    const getAgeRatingIcon = (ageRating?: number) => {
        switch (ageRating) {
            case 0: return Icons.RegionalRatingsKmrbRatingAll;
            case 12: return Icons.RegionalRatingsKmrbRating12;
            case 15: return Icons.RegionalRatingsKmrbRating15;
            case 19: return Icons.RegionalRatingsKmrbRating19;
            default: return Icons.RegionalRatingsKmrbRatingAll;
        }
    };

    const AgeRatingIcon = getAgeRatingIcon(movie.ageRating);

    return (
        <div className='block px-[48px] mt-[15px]'>
            <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr', columnGap: '2em' }}>
                <div className="grid gap-2 text-gray-300 mb-4">
                    <div className='flex gap-4 text-[16px] items-center' >
                        <span>{movie.releaseYear}</span>
                        <span>
                            {movie.runningTime ? `${Math.floor(movie.runningTime / 60)}시간 ${movie.runningTime % 60}분`
                            : movie.episodeCount ? `에피소드 ${movie.episodeCount}개` 
                            : movie.seasonCount ? `시즌 ${movie.seasonCount}개`
                            : movie.partCount ? `파트 ${movie.partCount}개`
                            : ''}
                        </span>
                        <span>HD</span>
                        <Icons.SubtitlesSmall className="w-[16px] h-[16px]" />
                    </div>
                    
                    <div className='flex gap-4'>
                        <AgeRatingIcon className='w-[30px] h-[30px]' />
                        <Icons.RegionalRatingsKmrbAdvisoriesLanguage className='w-[30px] h-[30px]' />
                        <Icons.RegionalRatingsKmrbAdvisoriesDrug className='w-[30px] h-[30px]' />
                        <Icons.RegionalRatingsKmrbAdvisoriesImitableBehavior className='w-[30px] h-[30px]' />
                    </div>
                    
                    <p className="text-white mt-4 text-[14px]">{movie.description}</p>
                </div>
                
                <div className="space-y-6 text-[14px]">
                    <div><p className="text-gray-400">출연:
                        <span className="text-white"> {movie.cast.slice(0, 5).join(', ')}</span>
                    </p></div>
                    <div><p className="text-gray-400">장르:
                        <span className="text-white"> {movie.genre.join(', ')}</span>
                    </p></div>
                    <div><p className="text-gray-400">영화특징:
                        <span className="text-white"> {movie.features.join(', ')}</span>
                    </p></div>
                </div>
            </div>
        </div>
    );
}
