import type { Content } from '../data/content';
import { contents } from '../data/content';

/* 컨텐츠 불러오기 API */
export const getContents = async (): Promise<Content[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(contents), 300);
  });
};

/* id로 컨텐츠 찾기 API */
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
