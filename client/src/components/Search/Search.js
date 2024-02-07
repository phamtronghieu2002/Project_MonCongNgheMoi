import './Search.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchPopper from '../Popper/SearchPopper/SearchPopper';
import { searchUser } from '../../services/userService';
export default function Search() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [searhDebouce] = useDebounce(search, 200);
    const [userSearch, setUserSearch] = useState([]);

    useEffect(() => {
        if(!searhDebouce)
        {
            setUserSearch([]);
            return;
        }
        const handleSearchUser = async () => {
            try {

                const response = await searchUser(searhDebouce);
                setUserSearch(response);
            } catch (error) {
                console.log(error);
            }
        };

        handleSearchUser();
    }, [searhDebouce]);

    const handleFocusSearch = () => {
        setIsSearch(true);
    };

    const handleClickCloseButton = () => {
        setIsSearch(false);
    };
    return (
        <div id="wp_search">
            {isSearch && <SearchPopper userSearch={userSearch} />}
            <input
                onFocus={handleFocusSearch}
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass search_icon"></i>
            {isSearch ? (
                <button onClick={handleClickCloseButton} className="btn_close">
                    close
                </button>
            ) : (
                <>
                    <button className="user_plus action_btn">
                        <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/external-thin-kawalan-studio/24/external-user-plus-users-thin-kawalan-studio.png"
                            alt="external-user-plus-users-thin-kawalan-studio"
                        />{' '}
                    </button>
                    <button className="group_plus action_btn">
                        <img
                            width="80"
                            height="80"
                            src="https://img.icons8.com/dotty/80/add-user-group-man-woman.png"
                            alt="add-user-group-man-woman"
                        />
                    </button>
                </>
            )}
        </div>
    );
}
