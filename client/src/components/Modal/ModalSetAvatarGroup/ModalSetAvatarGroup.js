import { useState } from 'react';
import OverLay from '../../Overlay/Overlay';
import DetailAvatarGroup from './DetailAvatarGroup';
import './style.scss';
import { avtarGroupAvailble } from '../../../assets/GroupAvatars';
export default function ModalSetAvatarGroup({ onHide }) {
    const [isShowDetailAvatar, setIsShowDetailAvatar] = useState(false);
    const [avatarActive, setAvatarActive] = useState('');
    const avatarGroupRender = avtarGroupAvailble.map((avatar, index) => ({
        imgURL: avatar,
        callback: () => {
            openDetailAvatar()
            setAvatarActive(avatar);
        },
    }));
const openDetailAvatar = () => {
    setIsShowDetailAvatar(true);
}
const closeDetailAvatar = () => {
    setIsShowDetailAvatar(false);
}
    return (
        <OverLay zIndex={99999999}>
            <div id="modalSetAvatarGroup">
                <div className="modal-dialog modal-dialog-centered position-relative">
                    <DetailAvatarGroup isShow={isShowDetailAvatar} />
                    <div className="modal-content">
                        <div className="modal-header">
                            {isShowDetailAvatar && (
                                <button
                                onClick={closeDetailAvatar}
                                className="btn_back">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </button>
                            )}
                            <h6 className="modal-title fw-bold">Chọn ảnh đại diện</h6>
                            <button
                                onClick={() => {
                                    onHide();
                                }}
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className={isShowDetailAvatar ? "animation_body_modal modal-body":"modal-body"}>
                            <div className="chose_image_from_computer">
                                <span>
                                    <i class="fa-regular fa-image"></i>
                                </span>
                                <h4>Tải ảnh lên từ máy tính</h4>
                            </div>

                            <p className="image_title"> Bộ sưu tập </p>
                            <div className="avatar_avalible row mt-3">
                                {avatarGroupRender.map((avatar, index) => (
                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                        <div className="avatar_item">
                                            <img
                                                onClick={avatar.callback}
                                                className={`avatar_group ${
                                                    avatarActive === avatar.imgURL ? 'active' : ''
                                                }`}
                                                src={avatar.imgURL}
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {isShowDetailAvatar && (
                            <div className="modal-footer" style={{marginTop:"55px"}}>
                                <button
                                    onClick={() => {
                                        onHide();
                                    }}
                                    type="button"
                                    className="btn btn-secondary"
                                >
                                    Hủy
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Lưu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </OverLay>
    );
}
