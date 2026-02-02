import { useEffect, useState } from 'react';
import { searchContents } from '../api/contentsApi';
import type { Content } from '../data/content';

/* 검색결과 인터페이스 */
interface UseSearchContentsResult {
  exactMatches: Content[];
  relatedMatches: Content[];
  loading: boolean;
  error: Error | null;
}

export const useSearchContents = (keyword: string): UseSearchContentsResult => {
  const [exactMatches, setExactMatches] = useState<Content[]>([]);
  const [relatedMatches, setRelatedMatches] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!keyword || keyword.trim().length === 0) {
      setExactMatches([]);
      setRelatedMatches([]);
      setLoading(false);
      setError(null);
      return;
    }

    /* useEffect마다 새로 생성하여 keyword가 변하면 이전 결과 무시 */
    let cancelled = false;

    /* api의 키워드 기반 검색 함수 호출 */
    const fetchSearchResult = async () => {
      /* 검색이 진행되는 동안 loading을 true로 */
      setLoading(true);
      setError(null);

      try {
        const result = await searchContents(keyword);

        if (!cancelled) {
          setExactMatches(result.exactMatches);
          setRelatedMatches(result.relatedMatches);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err
              : new Error('알 수 없는 에러가 발생했습니다.'),
          );
        }
      } finally {
        /* 모든 작업이 끝나면 loading을 false로 */
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSearchResult();

    return () => {
      cancelled = true;
    };
  }, [keyword]);

  return {
    exactMatches,
    relatedMatches,
    loading,
    error,
  };
};
