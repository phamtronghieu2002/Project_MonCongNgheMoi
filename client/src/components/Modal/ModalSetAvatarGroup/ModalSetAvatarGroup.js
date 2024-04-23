import { useRef, useState } from 'react';
import OverLay from '../../Overlay/Overlay';

import './style.scss';
import { avtarGroupAvailble } from '../../../assets/GroupAvatars';
export default function ModalSetAvatarGroup({ onHide,onSelectImageGroup,onChangeFileImage }) {

    const [avatarActive, setAvatarActive] = useState('');
    const inputRef=useRef();

    const onuploadImage = () => {
        inputRef.current.click();
    };
    const avatarGroupRender = avtarGroupAvailble.map((avatar, index) => ({
        imgURL: avatar,
        callback: () => {
            onHide();
            onSelectImageGroup(avatar)
            setAvatarActive(index);
        },
    }));
const handlUploadAvatarImage =(e)=>{
    const file = inputRef.current.files[0];
    if(!file){
        return;
    }
    const reader = new FileReader();
    reader.onloadend=()=>{
        onHide();
        onChangeFileImage(e.target.files[0])
        onSelectImageGroup(reader.result)
    }
    reader.readAsDataURL(file);
}
    return (
        <OverLay zIndex={99999999}>
            <div id="modalSetAvatarGroup">
                <div className="modal-dialog modal-dialog-centered position-relative">
              
                    <div className="modal-content">
                        <div className="modal-header">
            
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

                        <div className={"modal-body"}>
                        <input
                            ref={inputRef}
                            type="file"
                            className="visually-hidden"
                            accept="image/*"
                            onChange={handlUploadAvatarImage}
                        />
                            <div 
                         onClick={onuploadImage}
                            className="chose_image_from_computer">
                                <span>
                                    <i className="fa-regular fa-image text-light"></i>
                                </span>
                                <h4 className='text-light'>Tải ảnh lên từ máy tính</h4>
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


                    </div>
                </div>
            </div>
        </OverLay>
    );
}
