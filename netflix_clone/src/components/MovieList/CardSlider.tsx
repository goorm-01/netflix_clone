// 카드 슬라이더 컴포넌트

import { useState, useRef, useEffect } from "react";
import type { CardSliderProps } from "./types";
import type { Content } from "../../data/content";
import MovieCard from "./MovieCard";
import RankingCard from "./RankingCard";
import HoverPreview from "./HoverPreview";
import { useVisibleCount } from "../../hooks/useVisibleCount";

export default function CardSlider({ title, movies, variant = 'default' }: CardSliderProps) {
    // 슬라이더 상태
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [enableTransition, setEnableTransition] = useState(true);

    // 호버 프리뷰 상태
    const [hoveredMovie, setHoveredMovie] = useState<Content | null>(null);
    const [cardPosition, setCardPosition] = useState<DOMRect | null>(null);
    const [showPreview, setShowPreview] = useState(false);

<<<<<<< HEAD

=======
    
>>>>>>> a2aeb71 (리스트 컴포넌트 작성)
    // 슬라이더 타이틀 호버 샅애
    const [isTitleHovered, setIsTitleHovered] = useState(false);

    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const visibleCount = useVisibleCount();

    // 슬라이더 설정
    const gap = 16;
    const padding = 96;

    const cardWidth = containerWidth > 0
        ? (containerWidth - padding - gap * (visibleCount - 1)) / visibleCount
        : 230;

    // 앞뒤로 복제할 카드 수
    const cloneCount = visibleCount;

    // 복무한 루프를 위한 확장 배열 => [뒤쪽 복제] + [원본] + [앞쪽 복제]
    const extendedMovies = hasInteracted
        ? [
            ...movies.slice(-cloneCount), // 뒤쪽 카드들을 앞에 복제
            ...movies,
            ...movies.slice(0, cloneCount), // 앞쪽 카드들을 뒤에 복제
        ]
        : movies;

    // 실제 시작 오프셋 (복제된 앞부분만큼)
    const startOffset = hasInteracted ? cloneCount : 0;

    // 최대 인덱스 (원본 기준)
    const maxIndex = Math.max(0, movies.length - visibleCount);

    // 페이지 계산
    const totalPages = Math.ceil(maxIndex / visibleCount) + 1;
    const currentPage = Math.round(currentIndex / visibleCount);

    // 버튼 표시 조건
    const canPrev = hasInteracted;
    const canNext = true;

    // 컨테이너 너비 측정
    useEffect(() => {
        const updateWidth = () => {
            if (sliderRef.current) {
                setContainerWidth(sliderRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

<<<<<<< HEAD
    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

=======
>>>>>>> a2aeb71 (리스트 컴포넌트 작성)
    // 화면 크기 변경 시 currentIndex 보정
    useEffect(() => {
        // 순환 애니메이션 중에는 보정하지 않음
        if (isTransitioning) return;

        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [visibleCount, movies.length, currentIndex, maxIndex, isTransitioning]);

    // 실제 translateX 계산 (복제 오프셋 포함)
    const translateX = (currentIndex + startOffset) * (cardWidth + gap);

    const TRANSITION_DURATION = 500;

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setEnableTransition(true);  // 애니메이션 활성화

        if (currentIndex === 0) {
            setCurrentIndex(-visibleCount);
            setTimeout(() => {
                setEnableTransition(false);  // 애니메이션 비활성화
                setCurrentIndex(maxIndex);
                // 다음 프레임에서 애니메이션 다시 활성화
                requestAnimationFrame(() => {
                    setEnableTransition(true);
                    setIsTransitioning(false);
                });
            }, TRANSITION_DURATION);
        } else {
            const newIndex = Math.max(0, currentIndex - visibleCount);
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, TRANSITION_DURATION);
        }
    };

    const handleNext = () => {
        if (isTransitioning) return;
        if (!hasInteracted) setHasInteracted(true);
        setIsTransitioning(true);
        setEnableTransition(true);  // 애니메이션 활성화

        if (currentIndex >= maxIndex) {
            const newIndex = maxIndex + visibleCount;
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setEnableTransition(false);  // 애니메이션 비활성화
                setCurrentIndex(0);
                // 다음 프레임에서 애니메이션 다시 활성화
                requestAnimationFrame(() => {
                    setEnableTransition(true);
                    setIsTransitioning(false);
                });
            }, TRANSITION_DURATION);
        } else {
            const newIndex = Math.min(maxIndex, currentIndex + visibleCount);
            setCurrentIndex(newIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, TRANSITION_DURATION);
        }
    };

    // 호버 핸들러들
    const handleCardHover = (movie: Content, rect: DOMRect) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredMovie(movie);
            setCardPosition(rect);
            setShowPreview(true);
        }, 300);
    };

    const handleCardLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setShowPreview(false);
<<<<<<< HEAD
            setHoveredMovie(null);
            setCardPosition(null);
=======
>>>>>>> a2aeb71 (리스트 컴포넌트 작성)
        }, 100);
    };

    const handlePreviewEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };

    const handlePreviewLeave = () => {
        setShowPreview(false);
        setHoveredMovie(null);
    };

    return (
        <div ref={sliderRef} className="relative mb-8 group">
            {/* title & indicator */}
            <div
                className="flex items-center justify-between px-12 mb-2"
                onMouseEnter={() => setIsTitleHovered(true)}
                onMouseLeave={() => setIsTitleHovered(false)}
            >
                <div className="flex items-center cursor-pointer group/title">
                    <h2 className="text-white text-[1.4vw] font-bold">{title}</h2>
                    {/* 타이틀 호버 시 모두보기 나타남 */}
                    <div className="flex items-center text-[#54b9c5] text-[0.9vw] font-medium opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        <span className={`transition-all duration-500 overflow-hidden whitespace-nowrap translate-y-[5px] ${isTitleHovered ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'}`}>
                            모두보기
                        </span>
                        <span className="text-[2vw] font-bold">›</span>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-[2px] w-3 transition-colors ${index === (currentPage < 0 ? totalPages - 1 : currentPage > totalPages - 1 ? 0 : currentPage)
                                ? 'bg-white'
                                : 'bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* slider container */}
            <div className="relative overflow-x-clip overflow-y-visible">
                {/* card track */}
                <div
                    ref={trackRef}
                    className="flex px-12 py-4"
                    style={{
                        gap: `${gap}px`,
                        transform: `translateX(-${translateX}px)`,
                        transition: enableTransition
                            ? 'transform 500ms ease-out'
                            : 'none',
                    }}
                >
                    {extendedMovies.map((movie, index) =>
                        variant === 'ranking' ? (
                            <RankingCard
                                key={`${movie.id}-${index}`}
                                movie={movie}
                                rank={(index - startOffset + movies.length) % movies.length + 1}
                                onHover={handleCardHover}
                                onLeave={handleCardLeave}
                                cardWidth={cardWidth}
                            />
                        ) : (
                            <MovieCard
                                key={`${movie.id}-${index}`}
                                movie={movie}
                                onHover={handleCardHover}
                                onLeave={handleCardLeave}
                                cardWidth={cardWidth}
                            />
                        )
                    )}
                </div>

                {/* prev button */}
                {canPrev && (
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-4 bottom-4 w-12
                                     bg-black/50 hover:bg-black/70
                                     opacity-0 group-hover:opacity-100
                                     transition-opacity duration-300
                                     flex items-center justify-center z-20"
                    >
                        <span className="text-white text-4xl">‹</span>
                    </button>
                )}

                {/* next button */}
                {canNext && (
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-4 bottom-4 w-12
                                     bg-black/50 hover:bg-black/70
                                     opacity-0 group-hover:opacity-100
                                     transition-opacity duration-300
                                     flex items-center justify-center z-20"
                    >
                        <span className="text-white text-4xl">›</span>
                    </button>
                )}
            </div>

            {/* hover preview */}
            {showPreview && hoveredMovie && cardPosition && (
                <HoverPreview
                    movie={hoveredMovie}
                    position={cardPosition}
                    onMouseEnter={handlePreviewEnter}
                    onMouseLeave={handlePreviewLeave}
                />
            )}
        </div>
    );
}