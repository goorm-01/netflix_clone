import { useRef, useState, useEffect } from 'react';
import * as Icons from '../../assets/icons';

interface VideoPreviewProps {
    movie: any;
    onClose: () => void;
    addedItems: Set<number>;
    onToggleAddItem: (id: number) => void;
}

export default function VideoPreview({ movie, onClose, addedItems, onToggleAddItem }: VideoPreviewProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getEmbedUrl = (url: string) => {
        const videoId = url.split('youtu.be/')[1] || url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1`;
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        const iframe = iframeRef.current;
        if (iframe?.contentWindow) {
            iframe.contentWindow.postMessage(
                JSON.stringify({ event: 'command', func: nextMuted ? 'mute' : 'unMute', args: [] }), '*'
            );
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => { setIsVideoPlaying(true); }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-[515px] min-h-[515px] rounded-t-lg overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-[36px] h-[36px] bg-black/90 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                <Icons.XMedium className='w-[17px] h-[17px]' />
            </button>

            <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                {!isVideoPlaying ? (
                    <img src={movie.backdropUrl} alt={movie.title} className="w-full h-full object-cover" />
                ) : (
                    <iframe 
                        ref={iframeRef} 
                        src={getEmbedUrl(movie.previewLink)} 
                        className="absolute inset-0 w-full h-full rounded-t-lg scale-[1.05] origin-center" 
                        frameBorder="0" 
                        allow="autoplay; encrypted-media"
                        onLoad={() => {
                            setTimeout(() => {setIsVideoPlaying(false);}, 30000);
                        }}
                    />
                )}
            </div>
            
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
                        
                        <button
                            className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15"
                            aria-label="찜하기"
                            onClick={() => onToggleAddItem(movie.id)}
                        >
                            {addedItems.has(movie.id) ?
                                <Icons.CheckmarkMedium className="w-[17px] h-[17px]" /> :
                                <Icons.PlusMedium className="w-[17px] h-[17px]" />
                            }
                        </button>
                        
                        <button className="bg-black/5 text-white w-[38px] h-[38px] rounded-full flex items-center justify-center border-2 border-solid border-gray-400 hover:border-white hover:bg-white/15 " aria-label="좋아요">
                            <Icons.ThumbsUpMedium className="w-[17px] h-[17px]" />
                        </button>
                    </div>
                    
                    <button className="bg-black/5 text-gray-500 w-[35px] h-[35px] rounded-full flex items-center justify-center border-2 border-solid border-white/20 hover:border-white hover:text-white hover:bg-white/15" onClick={toggleMute}>
                        {isMuted ? (
                            <Icons.VolumeOffMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                        ) : (
                            <Icons.VolumeHighMedium className="w-[17px] h-[17px] transition-transform hover:scale-110" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}