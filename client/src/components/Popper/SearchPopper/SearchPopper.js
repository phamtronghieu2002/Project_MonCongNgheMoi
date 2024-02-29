import './SearchPopper.scss';
import AccountItem from '../../Search/AccountItem/AccountItem';
import { memo, useEffect } from 'react';
 function SearchPopper({searchCoversations}) {

    return (
        <div id="wp_search_popper">
            <h5 className="text-left fs-6 ps-3 cusor-pointer user-select-none">Recent Search</h5>
            <div className="users">
                {
                    searchCoversations.length > 0 ? searchCoversations.map((conversation, index) => (
                        <AccountItem
                            key={index}
                            {...conversation}
                        />
                    )) : <h6 className="text-center mt-3 fw-light">No user found</h6>
                }
 
            </div>
        </div>
    );
}
export default  memo(SearchPopper);
