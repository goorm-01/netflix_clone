import { useNavigate, useParams } from 'react-router-dom';
import moviesData from '../data/dummy-data.json';
import { ContentsDetailModal } from '../components/ContentsDetail';

export default function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const movie = moviesData.movies.find(m => m.id === Number(id));
    
    if (!movie) { 
        return <div>영화를 찾을 수 없습니다.</div>; 
    }
    
    const handleClose = () => { 
        navigate(-1); 
    };

    return (
        <ContentsDetailModal 
            movie={movie} 
            onClose={handleClose} 
        />
    );
}
