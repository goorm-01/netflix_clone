// 랭킹 카드 컴포넌트

import type { RankingCardProps } from "./types";

export default function RankingCard({ movie, rank, onHover, onLeave, cardWidth }: RankingCardProps) {
    //마우스 진입 시 카드 위치를 계산하여 부모에게 전달
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onHover?.(movie, rect);
    };

    // 카드 크기 계산
    const baseWidth = cardWidth || 200;
    const imageWidth = baseWidth * 0.55;                                //이미지 너비
    const imageHeight = imageWidth * 1.4;                               //이미지 높이
    const svgWidth = rank === 10 ? baseWidth * 0.7 : baseWidth * 0.5;   //10위는 조금 넓게
    const svgHeight = imageHeight;                                      //랭킹 숫자 svg높이는 이미지와 동일하게

    return (
        <div
            className="relative flex items-end flex-shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:z-10 overflow-visible"
            onMouseEnter={handleMouseEnter}
            style={{ width: `${baseWidth}px`, height: `${imageHeight}`}}
            onMouseLeave={onLeave}
        >
            {/* ranking number */}
            <svg
                width={svgWidth}
                height={svgHeight}
                className="flex-shrink-0 fill-transparent"
            >
                <use href={`/src/assets/rank/rank-sprite.svg#rank-${rank}`} />
            </svg>

            <img
                src={movie.backdropUrl}
                alt={movie.title}
                className={`object-cover -ml-4 rounded-r-[.2vw]`}
                style={{
                    width: `${imageWidth}px`,
                    height: `${imageHeight}px`,
                }}
            />
        </div>
    );
}