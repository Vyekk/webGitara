import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from 'config';

const ActivateAccount = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            navigate('/');
            return;
        }
        axios.post(`${API_URL}/api/users/activate`, { token }).finally(() => {
            navigate('/');
        });
    }, [searchParams, navigate]);

    return null;
};

export default ActivateAccount;
