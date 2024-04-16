import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState, useContext, createContext } from 'react';
import { toast } from 'react-toastify';
import { useGetProfileMutation } from 'src/lib/api/queriesAndMutations';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const getProfileMutation = useGetProfileMutation();

    // Effect to fetch user profile when component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getProfileMutation.mutateAsync();
                setUser(userData);
            } catch (error) {
                // Handle error
                toast.error(error?.message)
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
        return () => {
            getProfileMutation.reset();
        };
    }, [getProfileMutation]);

    const contextValue = useMemo(
        () => ({
            user,
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
