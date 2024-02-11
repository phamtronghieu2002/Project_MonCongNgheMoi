import './Search.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { searchUser } from '../../services/userService';
import SearchPopper from '../Popper/SearchPopper/SearchPopper';
export default function Search() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [searhDebouce] = useDebounce(search, 200);
    const [searchCoversations, setSearchCoversations] = useState([]);
    console.log("searchCoversations",searchCoversations);
    useEffect(() => {
        if(!searhDebouce)
        {
            setSearchCoversations([]);
            return;
        }
        const handleSearchResult = async () => {
            try {

                const response = await searchUser(searhDebouce);
                setSearchCoversations(response);
            } catch (error) {
                console.log(error);
            }
        };

        handleSearchResult();
    }, [searhDebouce]);

    const handleFocusSearch = () => {
        setIsSearch(true);
    };

    const handleClickCloseButton = () => {
        setIsSearch(false);
    };
    return (
        <div id="wp_search">
            {isSearch && <SearchPopper searchCoversations={searchCoversations} />}
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
