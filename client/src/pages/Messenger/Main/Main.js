import './Main.scss';
import Chat from './Chat/Chat';
import Aside from './Aside/Aside';
import Slider from './Slider/Slider';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
function Main() {
    const { conversation } = useContext(ConversationContext);
    console.log("conversation", conversation)
    return (
        <div id="main_container" className="d-flex">


            {conversation._id ? (
                <>
                    <div
                        className="background_conversation"
                        style={{
                            backgroundImage: `url(${conversation.recieveInfor?.avatar})`,
                            backgroundSize: 'cover',
                            filter: 'blur(400px)',
                            position: 'absolute',
                            top: 0,
                            width: '1136px',
                            bottom: 0,
                            right: 0,
                            zIndex: -1
                        }}
                    ></div>
                    <Chat />
                    {/* <Aside/> */}
                </>
            ) : (
                <Slider />
            )}
        </div>
    );
}

export default Main;
