import rawContents from './dummy-data.json';

export type ContentType = 'movie' | 'drama' | 'animation' | 'variety';

export interface Content {
  id: number;
  title: string;
  type: ContentType;
  thumbnail: string;
  previewLogo: string;
  creator: string[];
  cast: string[];
  genre: string[];
  features: string[];
  backdropUrl: string;
  description: string;
  previewLink: string;
  releaseYear: number;
  ageRating: number;
  runningTime?: number;
  isLimited?: boolean;
  partCount?: number;
  seasonCount?: number;
  episodeCount?: number;
}

/* JSON을 임시로 표현하는 내부 타입 */
type RawContent = {
  id: number;
  title: string;
  type: ContentType;
  thumbnail: string;
  previewLogo: string;
  creator: string[];
  cast: string[];
  genre: string[];
  features: string[];
  backdropUrl: string;
  description: string;
  previewLink: string;
  releaseYear: number;
  ageRating: number;
  runningTime?: number;
  isLimited?: boolean;
  partCount?: number;
  seasonCount?: number;
  episodeCount?: number;
};

type RawContentsFile = {
  movies?: RawContent[];
  dramas?: RawContent[];
  animations?: RawContent[];
  series?: RawContent[];
};

const raw = rawContents as unknown as RawContentsFile;

/* 정규화 함수 */
function normalizeContent(item: RawContent): Content {
  const base = {
    id: item.id,
    title: item.title,
    type: item.type,
    thumbnail: item.thumbnail ?? '',
    previewLogo: item.previewLogo ?? '',
    creator: item.creator ?? [],
    cast: item.cast ?? [],
    genre: item.genre ?? [],
    features: item.features ?? [],
    backdropUrl: item.backdropUrl ?? '',
    description: item.description ?? '',
    previewLink: item.previewLink ?? '',
    releaseYear: item.releaseYear,
    ageRating: item.ageRating,
  };

  switch (item.type) {
    case 'movie':
      return {
        ...base,
        runningTime: item.runningTime,
      };
    case 'drama':
      return {
        ...base,
        isLimited: item.isLimited ?? false,
        seasonCount: item.seasonCount ?? 0,
        episodeCount: item.episodeCount ?? 0,
      };
    case 'animation':
      return {
        ...base,
        seasonCount: item.seasonCount ?? 0,
        partCount: item.partCount ?? 0,
        episodeCount: item.episodeCount ?? 0,
      };
    case 'variety':
      return {
        ...base,
        seasonCount: item.seasonCount ?? 0,
        partCount: item.partCount ?? 0,
        episodeCount: item.episodeCount ?? 0,
      };
    default:
      return base as Content;
  }
}

const allRawContents: RawContent[] = [
  ...(raw.movies ?? []),
  ...(raw.dramas ?? []),
  ...(raw.animations ?? []),
  ...(raw.series ?? []),
];

/* contens 내보내기 */
export const contents: Content[] = allRawContents.map(normalizeContent);
