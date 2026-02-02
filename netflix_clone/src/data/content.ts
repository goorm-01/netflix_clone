import rawContents from './dummy-data.json';

export type ContentType = 'movie' | 'drama' | 'animation' | 'variety';

export interface Content {
  id: number;
  title: string;
  type: ContentType;
  creator: string[];
  cast: string[];
  genre: string[];
  features: string[];
  backdropUrl: string;
  description: string;
  previewLink: string;
  releaseYear: number;
  runningTime?: number;
  isLimited?: boolean;
  partCount?: number;
  seasonCount?: number;
  episodeCount?: number;
}

function normalizeContent(item: any): Content {
  const base = {
    id: item.id,
    title: item.title,
    type: item.type,
    creator: item.creator ?? [],
    cast: item.cast ?? [],
    genre: item.genre ?? [],
    features: item.features ?? [],
    backdropUrl: item.backdropUrl ?? '',
    description: item.description ?? '',
    previewLink: item.previewLink ?? '',
    releaseYear: item.releaseYear,
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

const allRawContents: any[] = [
  ...(rawContents.movies ?? []),
  ...(rawContents.dramas ?? []),
  ...(rawContents.animations ?? []),
  ...(rawContents.series ?? []),
];

export const contents: Content[] = allRawContents.map(normalizeContent);
