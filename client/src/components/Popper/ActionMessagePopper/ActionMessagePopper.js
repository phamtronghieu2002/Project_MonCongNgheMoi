import './style.scss';
import ManuItemPopper from '../MenuItemPopper/MenuItemPopper';
import { useContext } from 'react';
import { socketContext } from '../../../providers/Socket/SocketProvider';
import * as messagesService from '../../../services/messageService';
export default function ActionMessagePopper({ content, idMessage, data, own }) {
    const { socket } = useContext(socketContext);

    const handledeleteMessage = async () => {
        try {


            const new_message = await messagesService.deleteMessage(idMessage);
            socket.emit('delete-message', {
                ...data,
                new_message,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteMySeftMessage = async () => {
        try {

            const new_message = await messagesService.recallMessage(idMessage);
            socket.emit('recall-message', {
                ...data,
                new_message,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const menus = [
        {
            title: 'copy tin nhắn',
            Icon: <i class="fa-regular fa-clipboard"></i>,
            callback: async () => {
                navigator.clipboard.writeText(content);
            },
        },
        { title: 'xem chi tiết', Icon: <i class="fa-solid fa-circle-info"></i>, callback: () => { } },
        { title: 'thu hồi tin nhắn', Icon: <i class="fa-solid fa-recycle"></i>, callback: handledeleteMessage },
        { title: 'xóa chỉ ở phía tôi', Icon: <i class="fa-solid fa-trash"></i>, callback: handleDeleteMySeftMessage },
    ];

    return (
        <div className="action_message_popper_container">
            {menus.map((item, index) => {
                if (!own && index === menus.length - 2) {
                    return <div key={index}> </div>;
                }
                return <ManuItemPopper key={index} {...item} />;
            })}
        </div>
    );
}
