import React from 'react';

interface SearchBarProps {
  isSearchOpen: boolean;
  searchValue: string;
  shouldAnimate: boolean;
  searchContainerRef: React.RefObject<HTMLDivElement | null>;
  onSearchClick: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClose: () => void;
}

export default function SearchBar({
  isSearchOpen,
  searchValue,
  shouldAnimate,
  searchContainerRef,
  onSearchClick,
  onSearchChange,
  onSearchClose,
}: SearchBarProps) {
  return (
    <div className="relative w-[260px] h-[36px]" ref={searchContainerRef}>
      {/* 검색 아이콘 */}
      <button
        onClick={onSearchClick}
        className={`
          absolute right-0 top-0
          w-[36px] h-[36px]
          flex items-center justify-center
          transition-opacity duration-200
          ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 검색창 */}
      <div
        className={`
          absolute right-0 top-0
          h-[36px]
          flex items-center px-2
          bg-[#000000e6] border border-[#ffffff9d]
          overflow-hidden
          ${shouldAnimate ? 'transition-[width,opacity] duration-300 ease-out' : ''}
          ${isSearchOpen ? 'w-[260px] opacity-100' : 'w-0 opacity-0'}
        `}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
            clipRule="evenodd"
          />
        </svg>

        <input
          className="w-full px-2 outline-none bg-transparent text-white placeholder-[#969696]"
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder="제목, 배우, 장르"
        />

        <button
          type="button"
          onClick={onSearchClose}
          className="ml-2 text-gray-400 transition-colors hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}