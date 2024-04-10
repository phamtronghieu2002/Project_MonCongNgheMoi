import { useState, useCallback, useContext } from 'react';
import { socketContext } from '../../../../../providers/Socket/SocketProvider';
import ImageViewer from 'react-simple-image-viewer';
import Picker from 'emoji-picker-react';
import './MessageItem.scss';
import File from '../../../../../components/File/File';
import clsx from 'clsx';
import * as messageService from "../..//..//..//..//services/messageService"
import { ConversationContext } from '../../../../../providers/ConversationProvider/ConversationProvider';
import ActionMessagePopper from '../../../../../components/Popper/ActionMessagePopper/ActionMessagePopper';
function MessageItem({ senderId, receiverId, content, own, avatar, senderName, timeStamp }) {


    const { socket, currentUserId } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext)
    const [emojis, setEmojis] = useState({ emojis: '', index: 0 });
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
                return 'message_file';
            case 'icon':
                return 'message-icon';
        }
    };
    // const handleReaction = async (reaction) => {
    //     try {
    //         let emoji = reaction.emoji;
    //         await messageService.updateReactionMessage(id, emoji);
    //     } catch (error) {
    //         console.log(error);
    //     }


    // }
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
                                    className={clsx(handleStyleTypeMessage(item.type), "mb-1", "position-relative")}>
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
                                    <span
                                        className='feeling'>
                                        {
                                            emojis.index === index && emojis.emojis || item.reaction || <i class="fa-regular fa-thumbs-up"></i>
                                        }
                                        <Picker

                                            reactionsDefaultOpen={true} onReactionClick={async (reaction) => {
                                                try {
                                                    let emoji = reaction.emoji;
                                                    setEmojis({ emojis: emoji, index });
                                                    const message = await messageService.updateReactionMessage(item.id, emoji);
                                                    socket.emit('sendEmojiMessage', {
                                                        senderId: currentUserId,
                                                        conversationId: conversation._id,
                                                        new_message: message,
                                                        members: conversation.recieveInfor.members

                                                    })
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }} />
                                    </span>
                                    <span className='actions'>
                                        <i className="fa-solid fa-quote-left"></i>
                                        <i className="fa-solid fa-share"></i>
                                        <i className="fa-regular fa-calendar-check"></i>
                                        <i className="detail fa-solid fa-ellipsis d-block position-relative">
                                            <ActionMessagePopper content={item.content} />
                                        </i>
                                    </span>
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
