import './Main.scss';
import Chat from './Chat/Chat';
import Aside from './Aside/Aside';
import Slider from './Slider/Slider';
import { useContext } from 'react';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
function Main() {
    const { conversation } = useContext(ConversationContext);

    return (
        <div id="main_container" className="d-flex">


            {conversation._id ? (
                <>
                    <div
                        className="background_conversation"
                        style={{
                            backgroundImage: `url(${conversation.recieveInfor?.avatar})`,
                            backgroundSize: 'cover',
                            filter: 'blur(200px)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
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
