import { useState, useContext } from 'react';
import { useInfor } from '../../../hooks';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
import Loading from '../../Loading/Loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as userService from '../../../services/userService';
export default function EditUser({ hasTransitionedIn, editing }) {
    const currentUser = useInfor();
    const [gender, setGender] = useState(currentUser.gender);
    const [birth, setBirth] = useState(() => {
        if (currentUser.birth) {
            return new Date(currentUser.birth);
        }
        return new Date();
    });
    const [username, SetUsername] = useState(currentUser.username);
    const [loading, setLoading] = useState(false);
    const { updateUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const currentUserId = currentUser._id;

            const data = {
                username,
                birth,
                gender,
            };
            setLoading(true);
            const user = await userService.updateUser(currentUserId, data);
            setLoading(false);
            updateUser(user);
            toast.success('Cập nhật thông tin thành công');

        } catch (error) {
            console.log(error);
            if (error.status == 400) {
                toast.error('Cập nhật thông tin thất bại ,thiếu tham số ');
            }
        }
    };
    return (
        <>
            {loading && <Loading pendingAction />}
            <form onSubmit={handleSubmit} className={`infor ${hasTransitionedIn && 'in'} ${editing && 'visible'}`}>

                <div className="mb-3">
                    <label className="form-label">Họ và Tên:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => {
                            SetUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Giới tính:</label>
                    <div className="form-check form-check-inline  ms-3">
                        <input
                            onChange={(e) => {
                                setGender(e.target.value);
                            }}
                            checked={gender == 0}
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="inlineRadio1"
                            value="0"
                        />
                        <label className="form-check-label" for="inlineRadio1">
                            nam
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            onChange={(e) => {
                                setGender(e.target.value);
                            }}
                            checked={gender == 1}
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="inlineRadio2"
                            value="1"
                        />
                        <label className="form-check-label" for="inlineRadio2">
                            nữ
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày sinh:</label>
                    <DatePicker selected={birth} onChange={(date) => setBirth(date)} />
                </div>

                <div className="text-end">
                    <button type="submit" className="btn btn-primary position-relative end-0">
                        <i className="fas fa-save me-1"></i> Lưu
                    </button>
                </div>
            </form>
        </>
    );
}
