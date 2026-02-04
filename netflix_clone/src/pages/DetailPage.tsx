import { useNavigate, useParams } from 'react-router-dom';
import contentsData from '../data/dummy-data.json';
import { ContentsDetailModal } from '../components/ContentsDetail';

export default function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const movie = contentsData.movies.find(m => m.id === Number(id));
    
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
