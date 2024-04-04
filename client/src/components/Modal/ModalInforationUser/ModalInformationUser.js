import React, { useState, useRef, useContext } from 'react';
import { useInfor } from '../../../hooks';
import { getBase64 } from '../../../utils/imageUtil';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
import { updateImageUser } from '../../../services/userService';
import useMountTransition from '../../../hooks/useMountTransition';
import './style.scss';
import EditUser from './EditUser';
import Loading from '../../Loading/Loading';
const ModalInformationUser = () => {
    const [editing, setEditing] = useState(false);
    const { _id, avatarPicture, backgroundPicture, username, gender, phonenumber } = useInfor();
    const { updateUser } = useContext(AuthContext);
    const fileRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const hasTransitionedIn = useMountTransition(editing, 0);

    const handleEditButtonClick = () => {
        setEditing(true);
    };

    const handleBackButtonClick = () => {
        setEditing(false);
    };

    const onUpload = () => {
        fileRef.current.click();
    };

    const handleFileChange = async (e) => {
        try {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            setLoading(true);
            const user = await updateImageUser(_id, formData);
            setLoading(false);
            updateUser(user);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu cập nhật đi
        setEditing(false);
    };

    return (
        <div
            className="modal fade"
            id="personalInfoModal"
            tabIndex="-1"
            aria-labelledby="personalInfoModalLabel"
            aria-hidden="true"
        >
            {loading && <Loading pendingAction />}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        {editing && (
                            <button
                                style={{
                                    border: 0,
                                    outline: 0,
                                    background: 'none',
                                }}
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleBackButtonClick}
                            >
                                <i className="fas fa-arrow-left text-dark"></i>
                            </button>
                        )}
                        <h5 className="modal-title text-center" id="personalInfoModalLabel">
                            Thông tin cá nhân
                        </h5>
                        <button
                            onClick={handleBackButtonClick}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body position-relative">
                        {!editing && (
                            <>
                                <div
                                    className="background"
                                    style={{
                                        margin: '0 -16px 0 -16px',
                                        backgroundImage: `url(${backgroundPicture})`,
                                        backgroundSize: 'cover',
                                        height: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative',
                                    }}
                                ></div>
                                <div
                                    style={{
                                        position: 'relative',
                                        top: '-50px',
                                    }}
                                    className="header-body text-center"
                                >
                                    <label htmlFor="avatar" className="form-label position-relative">
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            className="visually-hidden"
                                            id="avatarInput"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <button
                                            onClick={onUpload}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                border: '1px solid white',
                                                borderRadius: '20px',
                                                background: '#eaedf0',
                                                color: '#081c36',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            className="btn_changeAvatar  position-absolute bottom-0 end-0"
                                        >
                                            <i className="fas fa-camera" id="changeAvatar"></i>
                                        </button>
                                        <img
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                            }}
                                            src={avatarPicture}
                                            className="rounded-circle img-thumbnail"
                                            alt="Avatar"
                                            id="avatarPreview"
                                        />
                                    </label>
                                    <h3 className="mt-2 text-dark fw-bold">{username}</h3>
                                </div>
                            </>
                        )}

                        {hasTransitionedIn || editing ? (
                            <EditUser {...{ hasTransitionedIn, editing }} />
                        ) : (
                            <div
                                style={{
                                    marginTop: '-30px',
                                }}
                                className="information"
                            >
                                <div
                                    className=""
                                    style={{ height: '5px', margin: '0 -16px 15px -16px', background: '#eef0f1' }}
                                ></div>
                                <h3
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                    }}
                                    className="text-left mb-4"
                                >
                                    Thông tin cá nhân
                                </h3>
                                <p className="p_infor">
                                    <strong className="me-3">Giới tính:</strong> <span>{gender ? 'nữ' : 'nam'}</span>
                                </p>
                                <p className="p_infor">
                                    <strong className="me-3">Ngày sinh:</strong> <span>12-2-2024</span>
                                </p>
                                <p className="p_infor">
                                    <strong className="me-3">Số điện thoại:</strong> <span> {phonenumber}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        {!editing && (
                            <button type="button" className="btn btn-primary" onClick={handleEditButtonClick}>
                                <i className="fas fa-edit me-1"></i> Chỉnh sửa thông tin
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInformationUser;
