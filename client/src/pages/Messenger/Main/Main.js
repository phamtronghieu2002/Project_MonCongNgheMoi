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
                    {/* <div
                        className="background_conversation"
                        style={{
                            backgroundImage: `url(${conversation.recieveInfor?.avatar})`,
                            backgroundSize: 'cover',
                            filter: 'blur(10px)',
                            position: 'absolute',
                            opacity: 0.07,
                            width: "100vw",
                            height: "100vh",

                            zIndex: -99
                        }}
                    ></div> */}
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
