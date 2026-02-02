import type { Content, ContentType } from '../data/content';
import { contents } from '../data/content';

/* 검색 결과 인터페이스 */
export interface SearchResult {
  exactMatches: Content[];
  relatedMatches: Content[];
}

/**
 * 모든 API는 0.3초의 딜레이 시간이 있음
 * Backend에서 데이터를 불러오는 것 같은 효과
 */

/* 컨텐츠 불러오기 API */
export const getContents = async (): Promise<Content[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contents), 300);
  });
};

/* id로 컨텐츠 불러오기 API */
export const getContentById = async (id: number): Promise<Content> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = contents.find((c) => c.id === id);
      if (!found) {
        reject(new Error('컨텐츠를 찾을 수 없습니다.'));
        return;
      }
      resolve(found);
    }, 300);
  });
};

/* 키워드로 컨텐츠 검색하기 API */
export const searchContents = async (
  keyword: string,
): Promise<SearchResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      /* 키워드를 기반으로 제목, 출연, 제작에서 탐색 */
      const exactMatches = contents.filter((c) => {
        return (
          c.title.includes(keyword) ||
          c.cast.includes(keyword) ||
          c.creator.includes(keyword)
        );
      });

      /* 유사 콘텐츠 추가(중복은 제거) */
      const relatedMatches = contents.filter((c) => {
        if (exactMatches.includes(c)) return false;

        return exactMatches.some(
          (m) =>
            m.genre.some((g) => c.genre.includes(g)) ||
            m.features.some((f) => c.features.includes(f)) ||
            c.type === m.type,
        );
      });

      resolve({ exactMatches, relatedMatches });
    }, 300);
  });
};

/* 타입(영화, 드라마 등)으로 컨텐츠 불러오기 API */
export const getContentsByType = async (
  type: ContentType,
): Promise<Content[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contents.filter((c) => c.type === type)), 300);
  });
};
