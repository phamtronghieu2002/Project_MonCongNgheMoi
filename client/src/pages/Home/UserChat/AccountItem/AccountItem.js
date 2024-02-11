import './AccountItem.scss';
import DetailUserChatPopper from '../../../../components/Popper/DetailUserChatPopper/DetailUserChatPopper';
import { useEffect, useState } from 'react';
import * as userService from '../../../../services/userService';
import React from 'react';
import { useLang } from '../../../../hooks';
function AccountItem({acc_index,onDetail,openPopper,members,isGroup,senderId}) {

    const { t } = useLang();
      const [openDetail,setOpenDetail]=useState(false);
      const [userChat,setUserChat]=useState(null);
console.log("userChat",userChat);
useEffect(() => {
    window.addEventListener("click",()=>setOpenDetail(false));
    if(openPopper===acc_index){
        setTimeout(() => {
            setOpenDetail(true);
        }, 200);
    }else{
        openDetail &&  setOpenDetail(false);
    }

},[openPopper])

useEffect(()=>{
    const fetchMember = async () => {
        try {
            if(isGroup){

            }
            const recieveid=members.find(id=>id!==senderId);
            console.log("recieveid",recieveid);
            const res = await userService.getUserById(recieveid);
            setUserChat(res);
        } catch (err) {
            console.log(err);
        }
    }
    fetchMember();
},[])

    return (
        <div  className="d-flex position-relative account_item_chat">
          {openDetail && <DetailUserChatPopper/> }  
            <div className="avatar">
                <img
                    className="single_chat_avatar"
                    src={userChat && userChat.avatarPicture || userChat.groupPicture }
                    alt="avt"
                />
            </div>
            <div className="infor">
                <span className="display_name">{userChat && userChat.username || userChat.groupname }</span>
                <br />
                <span className="last_message">Hello</span>
            </div>
            <span className="timer_message">{`5 ${t('home.account_chat_item.timmer.day')}`}</span>
            <button
            onClick={onDetail}
            className="detail_btn">...</button>

            <div className="num_message_miss">1</div>
        </div>
    );
}

export default React.memo(AccountItem);
