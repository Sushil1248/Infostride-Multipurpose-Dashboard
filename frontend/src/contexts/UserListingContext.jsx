import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from "react";
import { useGetUserListing } from "src/lib/api/queriesAndMutations";
import { useRouter } from 'src/routes/hooks';

export const INITIAL_USER_LISTING_STATE = {
    users: [],
    isLoading: false,
    setUsers: () => { },
    rerenderUserList: false,
    setRerenderUserList: () => { },
};

const UserListingContext = createContext(INITIAL_USER_LISTING_STATE);

const UserListingContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [rerenderUserList, setRerenderUserList] = useState(false);
    const getListingMutation = useGetUserListing();
    const { isLoading } = getListingMutation;

    const getUserListing = useCallback(async () => {
        try {
            const userDataResponse = await getListingMutation.mutateAsync();
            const userData = userDataResponse?.data;
            if (userData) {
                setUsers(userData.userData);
            }
        } catch (error) {
            console.error(error);
        }
    }, [getListingMutation]);

    useEffect(() => {
        getUserListing();
    }, []);

    const value = useMemo(() => ({
        users,
        setUsers,
        rerenderUserList,
        setRerenderUserList,
        isLoading,
    }), [users, rerenderUserList, isLoading]);

    return <UserListingContext.Provider value={value}>{children}</UserListingContext.Provider>;
};

export default UserListingContextProvider;

export const useUserListingContext = () => useContext(UserListingContext);

UserListingContextProvider.propTypes = {
    children: PropTypes.node,
};
