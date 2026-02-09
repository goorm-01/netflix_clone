// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header'; // Header import 추가
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

function AppContent() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Header />
      
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      
      {background && (
        <Routes>
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;