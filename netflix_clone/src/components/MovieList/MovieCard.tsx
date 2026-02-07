// 기본 카드 컴포넌트

import type { MovieCardProps } from "./types";

export default function MovieCard({ movie, onHover, onLeave, cardWidth }: MovieCardProps) {
    //마우스 진입 시 카드 위치를 계산하여 부모에게 전달
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onHover?.(movie, rect);
    }

    return (
        <div
            className="relative flex-shrink-0 w-[230px] cursor-pointer
            transition-transform duration-300 ease-out
            hover:z-10"
            style={{width: cardWidth ? `${cardWidth}px`: '230px'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onLeave}
        >
            <img
                src={movie.backdropUrl}
                alt={movie.title}
                className="w-full aspect-video object-cover rounded-[.2vw]"
            />
        </div>
    );
}
