import "./style.scss"
import ManuItemPopper from "../MenuItemPopper/MenuItemPopper";
import { useContext } from "react";
import { socketContext } from "../../../providers/Socket/SocketProvider";
import * as messagesService from "../../../services/messageService";
export default function ActionMessagePopper({ content, id, data }) {

    const { socket } = useContext(socketContext);

    const handledeleteMessage = async () => {
        try {
            console.log(id);
            console.log(data);
            const new_message = await messagesService.deleteMessage(id);
            socket.emit("delete-message", {
                ...data, new_message

            });
        } catch (error) {
            console.log(error);
        }
    }
    const menus = [
        {
            title: "copy tin nhắn", Icon: <i class="fa-regular fa-clipboard"></i>, callback: async () => {
                navigator.clipboard.writeText(content);
            }
        },
        { title: "xem chi tiết", Icon: <i class="fa-solid fa-circle-info"></i>, callback: () => { } },
        { title: "thu hồi tin nhắn", Icon: <i class="fa-solid fa-recycle"></i>, callback: handledeleteMessage },
    ];


    return (
        <div className="action_message_popper_container">
            {menus.map((item, index) => (
                <ManuItemPopper key={index} {...item} />
            ))}
        </div>
    );
}