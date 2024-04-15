
export default function DetailAvatarGroup({isShow}) {

    return (

        <div className="detail_avatar_group" style={{ transform: isShow ? ' translateX(0%)': ' translateX(102%)' }}>

            <div className="main_avatar">


            </div>
            <div className="owl-carousel">
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
</div>
        
    </div>
    );
}
