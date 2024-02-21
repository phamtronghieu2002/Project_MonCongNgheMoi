export default function Notify({ onSendRequestFriend, onCancelRequestFriend, statusRequest }) {
    return (
        <div
            className="d-flex pe-3 ps-3 pt-1 align-items-center w-100"
            style={{
                position: 'absolute',
                background: '#fff',
                left: '0',
                top: '0',
                height: '51px',
                borderBottom: '1px solid #d6dbe1',
                borderTop: '1px solid #d6dbe1',
                justifyContent: 'space-between',
                fontSize: '14px',
                padding: ' 0px 15px',
            }}
        >
            <span>Gửi yêu cầu kết bạn tới người này</span>
            {!statusRequest ? (
                <button style={{ fontSize: '12px' }} onClick={onSendRequestFriend} className="btn btn-primary">
                    Gửi
                </button>
            ) : (
                <button style={{ fontSize: '12px' }} onClick={onCancelRequestFriend} className="btn btn-danger">
                    Hủy
                </button>
            )}
        </div>
    );
}
