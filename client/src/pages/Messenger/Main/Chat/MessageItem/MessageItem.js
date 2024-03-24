import './MessageItem.scss';

function MessageItem({ senderId, receiverId, content, own, avatar, senderName, timeStamp }) {


    return (
        <div>
            <p className='timeStamp'>
                {timeStamp}
            </p>
            <div className={own ? 'message_item_own message-item' : 'message-item'}>



                {own || (
                    <div className="message-avatar">
                        <img src={avatar} alt="avatar" />
                    </div>
                )}
                <div className="message-content">
                    {
                        content.map((itemText, index) => (
                            <div className='cart-text'>
                                <div
                                    key={index}
                                    className="message-text">
                                    {
                                        !own && index == 0 && <p className='senderName'>{senderName}</p>
                                    }
                                    <p>{itemText.content}</p>
                                    <p className='time_stamp'>{index == content.length - 1 && itemText.messageTime}</p>
                                </div>
                            </div>

                        )

                        )}


                </div>
            </div>

        </div>
    );
}

export default MessageItem;
