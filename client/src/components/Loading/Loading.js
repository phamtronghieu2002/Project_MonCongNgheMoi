import './Loading.scss';
import clsx from 'clsx';
function Loading({pendingAction}) {
    return (

        
           <div 
           
           className={clsx("loading",pendingAction?"overlay":"")}>
  <span className="loading__dot"></span>
  <span className="loading__dot"></span>
  <span className="loading__dot"></span>
</div>
    );
}

export default Loading;
