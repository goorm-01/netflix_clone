// MovieList 컴포넌트 타입 정의
// Content 타입 import
import type { Content } from "../../data/content";

// 기본 카드 컴포넌트 props
/* 
    DOMRect : 요소의 위치 정보 반환
*/
export interface MovieCardProps {
    movie: Content;                                         //컨텐츠 데이터
    onHover?: (movie: Content, rect: DOMRect) => void;      //호버 시 콜백
    onLeave?: () => void;                                   //호버 해제 시 콜백
    cardWidth?: number;                                     //카드 너비
}

// 랭킹 카드 컴포넌트 props
export interface RankingCardProps {
    movie: Content;                                         //컨텐츠 데이터
    rank: number;                                           //순위
    onHover?: (movie: Content, rect: DOMRect) => void;      //호버 시 콜백
    onLeave?: () => void;                                   //호버 해제 시 콜백
    onClick?: (movie: Content) => void;                     //클릭 시 콜백
    cardWidth?: number;                                     //카드 너비
}

// 슬라이더 컴포넌트 props
export interface CardSliderProps {
    title: string;                                          //슬라이더 제목
    movies: Content[];                                      //컨텐츠 배열
    variant?: 'default' | 'ranking';                        //슬라이더 종류
}

// 호버 프리뷰 컴포넌트 Props
export interface HoverPreviewProps {
    movie: Content;                                         //컨텐츠 데이터
    position: DOMRect;                                      //원본 카드의 위치 정보
    onMouseEnter: () => void;                               //호버 시 콜백
    onMouseLeave: () => void;                               //호버 해제 시 콜백
}