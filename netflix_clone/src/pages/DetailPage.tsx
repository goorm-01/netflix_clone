import { useNavigate, useParams } from 'react-router-dom';
import { contents } from '../data/content';
import { ContentsDetailModal } from '../components/ContentsDetail';

export default function DetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const movie = contents.find((content) => content.id === Number(id));
    
    const handleClose = () => { 
        navigate(-1); 
    };

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
                콘텐츠를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <ContentsDetailModal 
            movie={movie} 
            onClose={handleClose} 
        />
    );
}
