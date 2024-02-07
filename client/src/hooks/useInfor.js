import { AuthContext } from '../providers/Auth/AuthProvider';
import { useContext } from 'react';
export default function useInfor() {
    const { getUser } = useContext(AuthContext);
    return getUser().data;
}
