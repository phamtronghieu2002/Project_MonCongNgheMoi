import OverLay from "../../Overlay/Overlay";
import "./style.scss";
export default function ModalSetAvatarGroup({ onHide }) {
    return (
        <OverLay
            zIndex={99999999}
        >
            <div id="modalSetAvatarGroup">
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title fw-bold">
                                Chọn ảnh đại diện
                            </h6>
                            <button
                                onClick={() => {
                                    onHide()
                                }}
                                type="button"
                                className="btn-close"
                                aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="chose_image_from_computer">
                                <span>
                                    <i class="fa-regular fa-image"></i>
                                </span>
                                <h4>
                                    Tải ảnh lên từ máy tính
                                </h4>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button

                                type="button"
                                className="btn btn-secondary">
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    onHide()
                                }}
                                type="button"
                                className="btn btn-primary"

                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </OverLay>
    );
}