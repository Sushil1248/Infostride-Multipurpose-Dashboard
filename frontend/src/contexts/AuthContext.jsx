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
    const [rerender, setRerender] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getProfileMutation = useGetProfileMutation();
    const router = useRouter();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    }, [router]);
    
    const checkAuthUser = useCallback(async () => {
        try {
            setIsLoading(true);
            if(isAuthenticated) return;
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
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [getProfileMutation, isAuthenticated]);

   

    const checkTokenPresenceAndValidity = useCallback(() => {
        const decodeToken = (token) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (error) {
                return {};
            }
        };

        const isTokenExpired = (token) => {
            if (token === "[]" || token === null || token === undefined) return true;
            const decodedToken = decodeToken(token); // Assuming you have a function to decode the token
            if (!decodedToken.exp) return true; // Token doesn't have an expiration time
            return Date.now() >= decodedToken.exp * 1000; // Check if the current time is past the expiration time
        };

        const token = localStorage.getItem('token');
        if (token === "[]" || token === null || token === undefined || isTokenExpired(token)) {
            setIsAuthenticated(false);
            router.push('/auth/login');
        }else{
            setIsAuthenticated(true);
        }
        if (!isAuthenticated && !isLoading) {
            checkAuthUser();
        }

    }, [checkAuthUser, router, isAuthenticated, isLoading]);


    useEffect(() => {
        checkTokenPresenceAndValidity();
    }, [checkTokenPresenceAndValidity]);

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
            logout
        }),
        [user, isAuthenticated, rerender, isLoading, checkAuthUser, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useUserContext = () => useContext(AuthContext);

AuthContextProvider.propTypes = {
    children: PropTypes.node,
};
