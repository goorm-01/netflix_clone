import SearchSuggestions from '../components/Search/SearchSuggestions';
import SearchResult from '../components/Search/SearchResult';

export default function SearchPage() {
  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-[#141414]'>
      <div className='w-11/12'>
        <SearchSuggestions />
        <SearchResult />
      </div>
    </div>
  )
}
