// React Router와 React 훅 import
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
// 영화 데이터와 아이콘 import
import moviesData from '../data/dummy-data.json';
import * as Icons from '../assets/icons';

/**
 * 영화 상세 페이지 컴포넌트
 * Netflix 스타일의 모달 형태로 영화 상세 정보를 표시
 */
export default function DetailPage() {
    // 페이지 이동을 위한 navigate 함수
    const navigate = useNavigate();
    // URL 파라미터에서 영화 ID 추출
    const { id } = useParams();
    
    // 상태 관리
    const [showAll, setShowAll] = useState(false); // 추천 영화 전체 보기 여부
    const [isVideoPlaying, setIsVideoPlaying] = useState(false); // 비디오 재생 상태
    const [isMuted, setIsMuted] = useState(true); // 음소거 상태
    const [addedItems, setAddedItems] = useState<Set<number>>(new Set()); // 찜한 영화 목록
    const iframeRef = useRef<HTMLIFrameElement>(null); // YouTube iframe 참조

    // URL 파라미터의 ID로 해당 영화 데이터 찾기
    const movie = moviesData.movies.find(m => m.id === Number(id));

    // 영화를 찾지 못한 경우 에러 메시지 표시
    if (!movie) { return <div>영화를 찾을 수 없습니다.</div>; }

    /**
     * 연령 등급에 따른 아이콘 반환 함수
     * @param ageRating - 연령 등급 (0: 전체, 12: 12세, 15: 15세, 19: 19세)
     * @returns 해당하는 연령 등급 아이콘 컴포넌트
     */
    const getAgeRatingIcon = (ageRating?: number) => {
        switch (ageRating) {
            case 0: return Icons.RegionalRatingsKmrbRatingAll;
            case 12: return Icons.RegionalRatingsKmrbRating12;
            case 15: return Icons.RegionalRatingsKmrbRating15;
            case 19: return Icons.RegionalRatingsKmrbRating19;
            default: return Icons.RegionalRatingsKmrbRatingAll;
        }
    };

    // 현재 영화의 연령 등급 아이콘 컴포넌트
    const AgeRatingIcon = getAgeRatingIcon(movie.ageRating);

    /**
     * YouTube URL을 embed URL로 변환하는 함수
     * @param url - 원본 YouTube URL
     * @returns 자동재생, 음소거 등이 설정된 embed URL
     */
    const getEmbedUrl = (url: string) => {
        // YouTube URL에서 비디오 ID 추출 (youtu.be 또는 youtube.com 형식 지원)
        const videoId = url.split('youtu.be/')[1] || url.split('v=')[1]?.split('&')[0];
        // embed URL 생성 (자동재생, 음소거, 컨트롤 숨김, 반복재생 등 설정)
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1`;
    };

    /**
     * 찜하기 목록에 영화를 추가/제거하는 함수
     * @param itemId - 영화 ID
     */
    const toggleAddItem = (itemId: number) => {
        setAddedItems(prev => {
            const newSet = new Set(prev);
            // 이미 찜한 영화면 제거, 아니면 추가
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    /* 비디오 음소거/음소거 해제 토글 함수 */
    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        const iframe = iframeRef.current;
        // iframe이 존재하면 YouTube API를 통해 음소거 상태 변경
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: nextMuted ? 'mute' : 'unMute', args: [] }), '*'
            );
        }
    };

    /**
     * 컴포넌트 마운트 시 비디오 재생 시작
     * 0.5초 후에 비디오 재생 상태로 변경
     */
    useEffect(() => {
        const timer = setTimeout(() => { setIsVideoPlaying(true); }, 500);
        return () => clearTimeout(timer);
    }, []);

    /* 모달 닫기 함수 - 이전 페이지로 이동 */
    const handleClose = () => { navigate(-1); };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            {/* 모달 컨테이너 - Netflix 스타일의 다크 테마 */}
            <div className="relative w-full max-w-[920px] mx-4 bg-[#181818] rounded-lg overflow-y-auto max-h-[90vh]">

                {/* 모달 닫기 버튼 (우상단) */}
                <button onClick={handleClose} className="absolute top-4 right-4 z-10 w-[36px] h-[36px] bg-black/90 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                    <Icons.XMedium className='w-[17px] h-[17px]' />
                </button>

                {/* 영화 프리뷰 영상 섹션 */}
                <div className="relative h-[515px] min-h-[515px] rounded-t-lg overflow-hidden">
                    <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                        {/* 비디오 재생 전에는 포스터 이미지 표시 */}
                        {!isVideoPlaying ? (
                            <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
                        ) : (
                        // YouTube 프리뷰 비디오 iframe
                        <iframe 
                            ref={iframeRef} 
                            src={getEmbedUrl(movie.previewLink)} 
                            className="absolute inset-0 w-full h-full rounded-t-lg scale-[1.05] origin-center" 
                            frameBorder="0" 
                            allow="autoplay; encrypted-media"
                            onLoad={() => {
                                // 30초 후 자동으로 비디오 정지하고 포스터로 전환
                                setTimeout(() => {setIsVideoPlaying(false);}, 30000);
                            }}
                        />
                        )}
                    </div>
                    {/* 하단 그라데이션 오버레이 - 텍스트 가독성 향상 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
                    {/* 프리뷰 영상 위 오버레이 컨텐츠 */}
                    <div className="absolute grid w-full px-[46px] bottom-0 p-6 z-10 gap-[35px]">
                        {/* 영화 로고 이미지 */}
                        <div className='w-[45%]'>
                            <img src={movie.previewLogo} alt={movie.title}></img>
                        </div>
                        {/* 액션 버튼들 */}
                        <div className="flex gap-4 mb-2 justify-between">
                            {/* 좌측 버튼 그룹 (재생, 찜하기, 좋아요) */}
                            <div className="flex gap-2">
                                {/* 재생 버튼 - 메인 CTA */}
                                <button className="bg-white text-black px-6 py-2 rounded font-semibold text-[16px] hover:bg-gray-200 flex items-center gap-2">
                                    <Icons.PlayMedium className="w-4 h-4" />
                                    <span>재생</span>
                                </button>
                                {/* 찜하기 버튼 - 토글 기능 */}
                                <button
                                    className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15"
                                    aria-label="찜하기"
                                    onClick={() => toggleAddItem(movie.id)}
                                >
                                    {/* 찜한 상태에 따라 아이콘 변경 (체크마크 또는 플러스) */}
                                    {addedItems.has(movie.id) ?
                                        <Icons.CheckmarkMedium className="w-[17px] h-[17px]" /> :
                                        <Icons.PlusMedium className="w-[17px] h-[17px]" />
                                    }
                                </button>
                                {/* 좋아요 버튼 */}
                                <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15 " aria-label="좋아요">
                                    <Icons.ThumbsUpMedium className="w-[17px] h-[17px]" />
                                </button>
                            </div>
                            {/* 우측 음소거 토글 버튼 */}
                            <button className="bg-black/5 text-gray-500 w-[35px] h-[35px] rounded-full flex items-center justify-center border-2 border-solid border-white/20 hover:border-white hover:text-white hover:bg-white/15" onClick={toggleMute}>
                                {/* 음소거 상태에 따라 아이콘 변경 */}
                                {isMuted ? (
                                    <Icons.VolumeOffMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                                ) : (
                                    <Icons.VolumeHighMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 메인 컨텐츠 영역 */}
                <div className='block px-[48px] mt-[15px]'>
                    {/* 영화 기본 정보 섹션 - 2열 그리드 레이아웃 */}
                    <div className="grid gap-6" style={{ gridTemplateColumns: '2fr 1fr', columnGap: '2em' }}>
                        {/* 좌측 컬럼 - 기본 정보 및 줄거리 */}
                        <div className="grid gap-2 text-gray-300 mb-4">
                            {/* 영화 메타데이터 (개봉년도, 상영시간, 화질, 자막) */}
                            <div className='flex gap-4 text-[16px] items-center' >
                                <span>{movie.releaseYear}</span>
                                <span>{Math.floor(movie.runningTime / 60)}시간 {movie.runningTime % 60}분</span>
                                <span>HD</span>
                                <Icons.SubtitlesSmall className="w-[16px] h-[16px]" />
                            </div>
                            {/* 등급 및 시청 주의사항 아이콘들 */}
                            <div className='flex gap-4'>
                                <AgeRatingIcon className='w-[30px] h-[30px]' /> {/* 연령 등급 */}
                                <Icons.RegionalRatingsKmrbAdvisoriesLanguage className='w-[30px] h-[30px]' /> {/* 언어 주의 */}
                                <Icons.RegionalRatingsKmrbAdvisoriesDrug className='w-[30px] h-[30px]' /> {/* 약물 주의 */}
                                <Icons.RegionalRatingsKmrbAdvisoriesImitableBehavior className='w-[30px] h-[30px]' /> {/* 모방위험 주의 */}
                            </div>
                            {/* 영화 줄거리 */}
                            <p className="text-white mt-4 text-[14px]">{movie.description}</p>
                        </div>
                        {/* 우측 컬럼 - 출연진, 장르, 특징 정보 */}
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

                    {/* 추천 영화 섹션 */}
                    <div className="relative mt-8">
                        <h2 className="text-[rgb(255,255,255)] text-[24px] font-normal mb-5">함께 시청된 콘텐츠</h2>
                        <div className="grid grid-cols-3 gap-5">
                            {/* 전체보기 상태에 따라 표시할 영화 수 조절 (기본 9개, 전체보기 시 모든 영화) */}
                            {moviesData.movies.slice(0, showAll ? moviesData.movies.length : 9).map((item) => (
                                <div key={item.id} className="cursor-pointer rounded bg-[rgb(47,47,47)] text-[rgb(210,210,210)] overflow-hidden">
                                    <div className="relative">
                                        <img src={item.backdropUrl} alt={item.title} className="w-full " />
                                        <div className='absolute inset-0' style={{ background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.6) 100%)' }} />
                                        <span className='absolute top-2 right-2 text-white px-2 py-1 text-[16px]'>{Math.floor(item.runningTime / 60)}시간 {item.runningTime % 60}분</span>
                                    </div>
                                    <div className='p-[16px] text-[16px] font-light flex justify-between'>
                                        <span>{item.releaseYear}</span>
                                        <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15" aria-label="찜하기" onClick={() => toggleAddItem(item.id)}>
                                            {addedItems.has(item.id) ?
                                                <Icons.CheckmarkMedium className="w-[17px] h-[17px]" /> :
                                                <Icons.PlusMedium className="w-[17px] h-[17px]" />
                                            }
                                        </button>
                                    </div>
                                    {/* 영화 줄거리 */}
                                    <div className='px-[14px] pb-[16px] text-[14px] font-extralight'>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* 더보기/접기 버튼 (영화가 9개 이상일 때만 표시) */}
                    {moviesData.movies.length > 9 && (
                        <div className="relative flex items-center justify-center">
                            {/* 상단 그라데이션 효과 */}
                            <div className="absolute mb-[60px] inset-x-0 h-16 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
                            {/* 중앙 구분선 */}
                            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30" />
                            {/* 더보기/접기 토글 버튼 */}
                            <button onClick={() => setShowAll(!showAll)} className="z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 border-gray-400 bg-black/30 text-white hover:border-gray-300">
                                {/* 전체보기 상태에 따라 아이콘 변경 (위쪽 화살표 또는 아래쪽 화살표) */}
                                {showAll ? (<Icons.ChevronUpMedium className="w-[18px] h-[18px]" />
                                ) : (<Icons.ChevronDownMedium className="w-[18px] h-[18px]" />
                                )}
                            </button>
                        </div>
                    )}

                    {/* 영화 상세 정보 섹션 */}
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
                                <p><AgeRatingIcon className='w-[30px] h-[30px]' /></p>
                                <p>{movie.ageRating}세이상관람가</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
