import './MessageItem.scss';
import ImageViewer from 'react-simple-image-viewer';
import { useState, useCallback } from 'react';
import File from '../../../../../components/File/File';
import clsx from 'clsx';
function MessageItem({ senderId, receiverId, content, own, avatar, senderName, timeStamp }) {

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };
    const handleStyleTypeMessage = (type) => {
        switch (type) {
            case 'text':
                return 'message-text';
            case 'image':
                return 'message-img';
            case 'file':
                return 'message-file';
            case 'icon':
                return 'message-icon';
        }
    };
    return (
        <div className='mb-3 message_container'>
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
                        content.map((item, index) => {

                            let type = item.type;
                            if (type == 'image') {
                                images.push(item.content);
                            }
                            return (
                                <div
                                    className={clsx(handleStyleTypeMessage(item.type), "mb-1")}>
                                    {
                                        !own && index == 0 && <p className='senderName'>{senderName}</p>
                                    }

                                    {type == 'text' ?
                                        <p>{item.content}</p>
                                        : type === 'image' || type === "icon" ?
                                            <img
                                                onClick={() => openImageViewer(index)}
                                                className='img_message' src={item.content} alt="image"
                                            />
                                            : <File {...item} />

                                    }
                                    <p className='time_stamp'>{index == content.length - 1 && item.messageTime}</p>

                                </div>
                            )
                        })
                    }


                </div>
            </div>
            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
        </div>
    );
}

export default MessageItem;
