// 호버 프리뷰 컴포넌트

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { HoverPreviewProps } from "./types";
import type { Content } from "../../data/content";

export default function HoverPreview({ movie, position, onMouseEnter, onMouseLeave }: HoverPreviewProps) {
    const [isAnimating, setIsAnimating] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    // 프리뷰 영상 링크 파싱 및 자동/반복 재생 링크로 반환
    const getPreviewUrl = (url: string): string | null => {
        if (!url) return null;

        // Url 형식이 yotu.be/* 인 경우
        const shortUrl = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortUrl) {
            return `https://www.youtube.com/embed/${shortUrl[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${shortUrl[1]}`;
        }

        // Url 형식이 youtube.com/* 인 경우
        const longUrl = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        if (longUrl) {
            return `https://www.youtube.com/embed/${longUrl[1]}?autoplay=1&mute=1&controls=0&loop=1&playlist=${longUrl[1]}`;
        }

        return null;
    };

    // 시간 포멧팅 함수 (분 -> 시간/분)
    const formatRunningTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0 && mins > 0) {
            return `${hours}시간 ${mins}분`;
        } else if (hours > 0) {
            return `${hours}시간`;
        } else if (mins > 0) {
            return `${mins}분`;
        }
        return '';
    }

    // 부가 정보 텍스트 변환
    const getTypeText = (movie: Content): string | null => {
        if (movie.runningTime) return formatRunningTime(movie.runningTime);
        if (movie.seasonCount) return `시즌 ${movie.seasonCount}개`;
        if (movie.episodeCount) return `에피소드 ${movie.episodeCount}개`;
        if (movie.partCount) return `파트 ${movie.partCount}개`;
        if (movie.isLimited) return '리미티드 시리즈';
        return null;
    }

    // 프리뷰 크기 계산 및 위치 계산
    const scale = 1.5;
    const previewWidth = position.width * scale;
    // 프리뷰 이미지 및 영상이 항상 16:9 비율을 유지하도록 계산
    const previewHeight = previewWidth * (9 / 16);

    // 확장 시 이동할 거리 계산
    const expandX = (previewWidth - position.width) / 2;
    const expandY = (previewHeight - position.height);

    // 화면 가장자리 판단 (좌/우 끝 카드의 확장은 다르게 처리)
    const edgeThreshold = 60;
    const isLeftEdge = position.left < edgeThreshold;
    const isRightEdge = position.right > window.innerWidth - edgeThreshold;

    // 최종 위치 계산
    let finalLeft: number;

    if (isLeftEdge) {
        // 좌측 카드: 왼쪽 고정
        finalLeft = position.left;
    } else if (isRightEdge) {
        // 우측 카드: 오른쪽 고정
        finalLeft = position.right - previewWidth;
    } else {
        // 중간 카드: 중앙 기준
        finalLeft = position.left - expandX;
    }

    // 상하 중앙 기준으로 확장
    let finalTop = position.top - expandY;

    // 화면 가장자리 보정
    if (finalLeft < 10) finalLeft = 10;
    if (finalLeft + previewWidth > window.innerWidth - 10) {
        finalLeft = window.innerWidth - previewWidth - 60;
    }
    if (position.top < 10) return null;

    // 프리뷰가 열린 시점에서의 화면 위치 저장
    const fixedPositionRef = useRef({
        left: finalLeft,
        top: finalTop,
        width: previewWidth,
        height: previewHeight,
    });

    // 프리뷰가 열린 시점에서의 스크롤 위치 저장
    const fixedScrollRef = useRef({
        x: window.scrollX,
        y: window.scrollY,
    });

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onMouseLeave();
        }, 200);
    };

    // 애니메이션 시작
    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setIsAnimating(false);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    // 초기 상태 (카드 크기/위치) vs 최종 상태 (확대된 크기/위치)
    const currentWidth = isAnimating ? position.width : (isClosing ? position.width : fixedPositionRef.current.width);
    const currentHeight = isAnimating ? position.height : (isClosing ? position.height : fixedPositionRef.current.height);
    const currentLeft = isAnimating ? position.left : (isClosing ? position.left : fixedPositionRef.current.left);
    const currentTop = isAnimating ? position.top : (isClosing ? position.top : fixedPositionRef.current.top);

    // HoverPreview를 body 바로 아래에 렌더링하여 부모 영향을 받지 않게 수정
    return createPortal(
        <div
            className="absolute z-50 bg-[#181818] rounded-[.2vw] shadow-2xl overflow-visible"
            style={{
                left: `${currentLeft + fixedScrollRef.current.x}px`,
                top: `${currentTop + fixedScrollRef.current.y}px`,
                width: `${currentWidth}px`,
                opacity: isClosing ? 0 : 1,
                transition: isAnimating ? 'none' : 'all 0.2s ease-out',
                boxShadow: 'rgba(0,0,0,0.75) 0px 3px 10px 0px'
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleClose}
        >
            <div
                className="relative overflow-hidden"
                style={{
                    height: `${currentHeight}px`,
                    transition: isAnimating ? 'none' : 'height 0.2s ease-out',
                }}
            >
                {getPreviewUrl(movie.previewLink) ? (
                    <iframe
                        src={getPreviewUrl(movie.previewLink)!}
                        title="movie.title"
                        className="w-full h-full rounded-t-[.2vw]"
                        allow="autoplay; encrypted-media"
                        style={{ border: 'none' }}
                    />
                ) : (
                    <img
                        src={movie.backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-t-[.2vw]"
                    />
                )}

            </div>

            <div
                className="p-4"
                style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating ? 'translateY(-10px)' : 'translateY(0)',
                    transition: 'opacity 0.2s ease-out 0.1s, transform 0.2s ease-out 0.1s',
                    cursor: 'pointer',
                }}
            >
                <div className="flex gap-2 mb-5">
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-[rgba(255,255,255,0.9)]">
                        <span className="text-balck text-lg">
                            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="PlayMedium" data-icon-id=":r36:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="currentColor" d="M5 2.7a1 1 0 0 1 1.48-.88l16.93 9.3a1 1 0 0 1 0 1.76l-16.93 9.3A1 1 0 0 1 5 21.31z"></path></svg>
                        </span>
                    </button>
                    {/* 찜하기 버튼 */}
                    <button className="relative group w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:bg-[rgba(255,255,255,0.15)]">
                        <span className="text-white text-xl">
                            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="PlusMedium" data-icon-id=":r37:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="currentColor" fill-rule="evenodd" d="M11 11V2h2v9h9v2h-9v9h-2v-9H2v-2z" clip-rule="evenodd"></path></svg>
                        </span>
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2
                     bg-white text-black text-sm font-semibold px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     pointer-events-none whitespace-nowrap transition-opacity">
                            내가 찜한 콘텐츠
                            <span className="absolute top-full left-1/2 -translate-x-1/2
                       border-4 border-transparent border-t-white" />
                        </span>
                    </button>
                    {/* 좋아요 버튼 */}
                    <button className="relative group w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white hover:bg-[rgba(255,255,255,0.15)]">
                        <span className="text-white text-sm">
                            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="ThumbsUpMedium" data-icon-id=":r38:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="currentColor" fill-rule="evenodd" d="M10.696 8.773A2 2 0 0 0 11 7.713V4h.838c.877 0 1.59.553 1.77 1.311C13.822 6.228 14 7.227 14 8a7 7 0 0 1-.246 1.75L13.432 11H17.5a1.5 1.5 0 0 1 1.476 1.77l-.08.445.28.354c.203.256.324.578.324.931s-.12.675-.324.93l-.28.355.08.445q.024.13.024.27c0 .49-.234.925-.6 1.2l-.4.3v.5a1.5 1.5 0 0 1-1.5 1.5h-3.877a9 9 0 0 1-2.846-.462l-1.493-.497A10.5 10.5 0 0 0 5 18.5v-4.747l2.036-.581a3 3 0 0 0 1.72-1.295zM10.5 2A1.5 1.5 0 0 0 9 3.5v4.213l-1.94 3.105a1 1 0 0 1-.574.432l-2.035.581A2 2 0 0 0 3 13.754v4.793c0 1.078.874 1.953 1.953 1.953.917 0 1.828.148 2.698.438l1.493.498a11 11 0 0 0 3.479.564H16.5a3.5 3.5 0 0 0 3.467-3.017 3.5 3.5 0 0 0 1.028-2.671c.32-.529.505-1.15.505-1.812s-.185-1.283-.505-1.812Q21 12.595 21 12.5A3.5 3.5 0 0 0 17.5 9h-1.566c.041-.325.066-.66.066-1 0-1.011-.221-2.194-.446-3.148C15.14 3.097 13.543 2 11.838 2z" clip-rule="evenodd"></path></svg>
                        </span>
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2
                     bg-white text-black text-sm font-semibold px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     pointer-events-none whitespace-nowrap transition-opacity">
                            좋아요
                            <span className="absolute top-full left-1/2 -translate-x-1/2
                       border-4 border-transparent border-t-white" />
                        </span>
                    </button>
                    {/* 상세정보 버튼 - 오른쪽 끝 */}
                    <button className="relative group w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white ml-auto hover:bg-[rgba(255,255,255,0.15)]">
                        <span className="text-white text-lg">
                            <svg viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronDownMedium" data-icon-id=":r39:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="currentColor" fill-rule="evenodd" d="m12 15.586 7.293-7.293 1.414 1.414-8 8a1 1 0 0 1-1.414 0l-8-8 1.414-1.414z" clip-rule="evenodd"></path></svg>
                        </span>
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2
                     bg-white text-black text-sm font-semibold px-2 py-1 rounded
                     opacity-0 group-hover:opacity-100
                     pointer-events-none whitespace-nowrap transition-opacity">
                            {movie.type === 'movie' ? '상세 정보' : '회차 및 상세 정보'}
                            <span className="absolute top-full left-1/2 -translate-x-1/2
                       border-4 border-transparent border-t-white" />
                        </span>

                    </button>
                </div>

                <div className="flex items-center gap-2 text-sm flex-wrap mb-5">
                    {getTypeText(movie) && (
                        <span className="text-gray-400 text-[16px]">{getTypeText(movie)}</span>
                    )}
                </div>
                {movie.genre && movie.genre.length > 0 && (
                    <div className="mt-2 text-[16px] text-gray-300 mb-5">
                        {movie.genre.join(' • ')}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}