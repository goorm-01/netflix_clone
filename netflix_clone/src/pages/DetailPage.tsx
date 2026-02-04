import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import moviesData from '../data/dummy-data.json';
import * as Icons from '../assets/icons';

export default function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAll, setShowAll] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const movie = moviesData.movies.find(m => m.id === Number(id));

    if (!movie) {return <div>영화를 찾을 수 없습니다.</div>;}

    const getEmbedUrl = (url: string) => {
        const videoId = url.split('youtu.be/')[1] || url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&enablejsapi=1`;
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: nextMuted ? 'mute' : 'unMute', args: [] }),'*'
            );
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {setIsVideoPlaying(true);}, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {navigate(-1);};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-full max-w-[920px] mx-4 bg-[#181818] rounded-lg overflow-y-auto max-h-[90vh]">

                {/* 취소버튼 */}
                <button onClick={handleClose} className="absolute top-4 right-4 z-10 w-[36px] h-[36px] bg-black/90 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <Icons.XMedium className='w-[17px] h-[17px]' />
                </button>

                {/* 프리뷰 영상 부분 (제목 + 재생버튼) */}
                <div className="relative h-[515px] min-h-[515px]">
                    {!isVideoPlaying ? (
                    <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
                ) : (
                    <iframe
                        ref={iframeRef}
                        src={getEmbedUrl(movie.previewLink)}
                        className="w-full h-full object-cover"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{aspectRatio: 'auto'}}
                        onLoad={() => {
                            setTimeout(() => {
                                setIsVideoPlaying(false);
                            }, 30000);
                        }}
                    />
                )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
                    <div className="absolute grid w-full px-[46px] bottom-0 p-6 z-10 gap-[35px]">
                        <div className='w-[45%]'>
                            <img src={movie.previewLogo} alt={movie.title}></img>
                        </div>
                        <div className="flex gap-4 mb-2 justify-between">
                            <div className="flex gap-2">
                                <button className="bg-white text-black px-6 py-2 rounded font-semibold text-[16px] hover:bg-gray-200 flex items-center gap-2">
                                    <Icons.PlayMedium className="w-4 h-4" />
                                    <span>재생</span>
                                </button>
                                <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15 " aria-label="찜하기">
                                    <Icons.PlusMedium className="w-[17px] h-[17px]" />
                                </button>
                                <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15 " aria-label="좋아요">
                                    <Icons.ThumbsUpMedium className="w-[17px] h-[17px]" />
                                </button>
                            </div>
                            <button className="bg-black/5 text-gray-500 w-[35px] h-[35px] rounded-full flex items-center justify-center border-2 border-solid border-white/20 hover:border-white hover:text-white hover:bg-white/15" onClick={toggleMute}>
                                {isMuted ? (<Icons.VolumeOffMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                                ) : (<Icons.VolumeHighMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 컨텐츠 + 추천 */}
                <div className='block px-[48px] mt-[15px]'>
                    {/* 상세 정보 */}
                    <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr', columnGap: '2em' }}>
                        <div className="grid gap-2 text-gray-300 mb-4">
                            <div className='flex gap-4 text-[16px] items-center' >
                                <span>{movie.releaseYear}</span>
                                <span>{Math.floor(movie.runningTime / 60)}시간 {movie.runningTime % 60}분</span>
                                <span>HD</span>
                                <Icons.SubtitlesSmall className="w-[16px] h-[16px]" />
                            </div>
                            <div className='flex gap-4'>
                                <Icons.RegionalRatingsKmrbRating15 className='w-[30px] h-[30px]' />
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
                            </p>
                            </div>
                        </div>
                    </div>

                    {/* 함께 시청된 콘텐츠 */}
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
                                    <div className='p-[16px] text-[16px] font-light'>
                                        <span>{item.releaseYear}</span>
                                    </div>
                                    <div className='px-[14px] pb-[16px] text-[14px] font-extralight'>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {moviesData.movies.length > 9 && (
                        <div className="relative flex items-center justify-center">
                            <div className="absolute mb-[60px] inset-x-0 h-16 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30" />
                            <button onClick={() => setShowAll(!showAll)} className="z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-gray-400 bg-black/30 text-white hover:border-gray-300">
                                {showAll ? (<Icons.ChevronUpMedium className="w-[18px] h-[18px]" />)
                                    : (<Icons.ChevronDownMedium className="w-[18px] h-[18px]" />
                                    )}
                            </button>
                        </div>
                    )}

                    {/* 영화 상세 정보 */}
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
                                <p>{movie.features}</p>
                            </div>
                            <div className='flex gap-1'>
                                <p className="text-gray-400">관람등급: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
