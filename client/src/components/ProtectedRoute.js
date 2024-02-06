import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/Auth/AuthProvider';
import Loading from './Loading/Loading';

export default function ProtectedRoute({ children }) {
    const { getUser } = useContext(AuthContext);

    return !getUser().auth ? <Loading /> : children;
}
