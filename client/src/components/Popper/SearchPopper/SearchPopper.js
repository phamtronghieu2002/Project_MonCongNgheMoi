import './SearchPopper.scss';
import AccountItem from '../../Search/AccountItem/AccountItem';
export default function SearchPopper({userSearch}) {
    return (
        <div id="wp_search_popper">
            <h5 className="text-left fs-6 ps-3 cusor-pointer user-select-none">Recent Search</h5>
            <div className="users">
                {
                    userSearch.length > 0 ? userSearch.map((user, index) => (
                        <AccountItem
                            key={index}
                            {...user}
                        />
                    )) : <h6 className="text-center mt-3 fw-light">No user found</h6>
                }
 
            </div>
        </div>
    );
}
