import './MenuItemPopper.scss';
import clsx from 'clsx';
function ManuItemPopper({ Icon, title, subMenu, callback, titleStyle, props, active }) {
    return (
        <div
            onClick={callback}
            className={clsx("menu_item_poper position-relative", active && "active")}
            {...props}
        >
            <span
                style={{
                    margin: "0.5rem"
                }}
            > {Icon && Icon} </span>
            <span className={titleStyle}>{title}</span>
            {subMenu && <i style={{ position: 'absolute', right: '10px' }} className="fa-solid fa-chevron-right"></i>}
            {subMenu && (
                <div className="sub_menu_poper">
                    {subMenu.map((item, index) => (
                        <ManuItemPopper key={index} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ManuItemPopper;
