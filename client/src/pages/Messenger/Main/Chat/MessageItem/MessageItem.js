import './MessageItem.scss';
import { useContext } from 'react';

function MessageItem({ senderId, receiverId, content, own,avatar }) {


    return (
        <div className={own ? 'message_item_own message-item' : 'message-item'}>
            {own || (
                <div className="message-avatar">
                    <img src={avatar} alt="avatar" />
                </div>
            )}
            <div className="message-content">
                {Array.isArray(content) ? (
                    content.map((text) => (
                        <div className="message-text">
                            <p>{text}</p>
                        </div>
                    ))
                ) : (
                    <div className="message-text">
                        <p>{content}</p>
                    </div>
                )}

               
            </div>
        </div>
    );
}

export default MessageItem;
