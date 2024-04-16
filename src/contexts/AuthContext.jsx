import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from "react";
import { useGetProfileMutation } from "src/lib/api/queriesAndMutations";
import { useRouter } from 'src/routes/hooks';

export const INITIAL_USER = {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
    profile_pic: "",
    role: "",
    permissions: [],
};

export const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    setUser: () => { },
    isAuthenticated: false,
    rerender: false,
    setRerender: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rerender, setRerender] = useState(false); // Initialize the state
    const getProfileMutation = useGetProfileMutation();
    const { isLoading } = getProfileMutation;

    const router = useRouter();

    const checkAuthUser = useCallback(async () => {
        try {
            const userDataResponse = await getProfileMutation.mutateAsync();
            const userData = userDataResponse?.data;
            if (userData) {
                setUser({
                    id: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    username: userData.username,
                    email: userData.email,
                    role: userData.role,
                    bio: userData.bio,
                    profile_pic: userData.profile_pic,
                    permissions: userData.permissions,
                });
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }, [getProfileMutation]);

    useEffect(() => {
        const cookieFallback = localStorage.getItem("token");
        if (cookieFallback === "[]" || cookieFallback === null || cookieFallback === undefined) {
            router.push('/auth/login')
            return;
        }
        if (!isAuthenticated && !isLoading) {
            checkAuthUser();
        }
    }, [router, checkAuthUser, isAuthenticated, isLoading]);

    const value = useMemo(
        () => ({
            user,
            setUser,
            isAuthenticated,
            rerender,
            setRerender,
            isLoading,
            setIsAuthenticated,
            checkAuthUser,
        }),
        [user, isAuthenticated, rerender, isLoading, checkAuthUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useUserContext = () => useContext(AuthContext);
AuthContextProvider.propTypes = {
    children: PropTypes.node,
};
