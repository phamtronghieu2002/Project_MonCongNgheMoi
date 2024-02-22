import "./Messenger.scss"
import SidebarNav from "../../components/SidebarNav/SidebarNav";
import Conversation from "./Conversation/Conversation";
import Main from "./Main/Main";
function Messenger() {

  return (
    <div id="wp_messenger_page">
      <SidebarNav/>
      <Conversation/>
      <Main/>
    </div>
  );
}

export default Messenger;
