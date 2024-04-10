import "./style.scss"
import ManuItemPopper from "../MenuItemPopper/MenuItemPopper";
export default function ActionMessagePopper({ content }) {

    const menus = [
        {
            title: "copy tin nhắn", Icon: <i class="fa-regular fa-clipboard"></i>, callback: () => {
                navigator.clipboard.writeText(content);
            }
        },
        { title: "xem chi tiết", Icon: <i class="fa-solid fa-circle-info"></i>, callback: () => { } },
        { title: "thu hồi tin nhắn", Icon: <i class="fa-solid fa-recycle"></i>, callback: () => { } },
    ];


    return (
        <div className="action_message_popper_container">
            {menus.map((item, index) => (
                <ManuItemPopper key={index} {...item} />
            ))}
        </div>
    );
}