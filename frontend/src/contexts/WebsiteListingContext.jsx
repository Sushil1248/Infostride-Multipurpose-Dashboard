import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from "react";
import { useGetWebsiteListing } from "src/lib/api/queriesAndMutations";

export const INITIAL_WEBSITE_LISTING_STATE = {
    Websites: [],
    isLoading: false,
    setWebsites: () => { },
    rerenderWebsiteList: false,
    setRerenderWebsiteList: () => { },
};

const WebsiteListingContext = createContext(INITIAL_WEBSITE_LISTING_STATE);

const WebsiteListingContextProvider = ({ children }) => {
    const [websites, setWebsites] = useState([]);
    const [rerenderWebsiteList, setRerenderWebsiteList] = useState(false);
    const getListingMutation = useGetWebsiteListing();
    const { isLoading } = getListingMutation;

    const getWebsiteListing = useCallback(async () => {
        try {
            const WebsiteDataResponse = await getListingMutation.mutateAsync();
            const WebsiteData = WebsiteDataResponse?.data;
            console.log(WebsiteData)
            if (WebsiteData) {
                setWebsites(WebsiteData.websites);
                console.log(websites, "wevs")
            }
        } catch (error) {
            console.error(error);
        }
    }, [getListingMutation]);

    useEffect(() => {
        getWebsiteListing();
    }, []);

    const value = useMemo(() => ({
        websites,
        setWebsites,
        rerenderWebsiteList,
        setRerenderWebsiteList,
        isLoading,
    }), [websites, rerenderWebsiteList, isLoading]);

    return <WebsiteListingContext.Provider value={value}>{children}</WebsiteListingContext.Provider>;
};

export default WebsiteListingContextProvider;

export const useWebsiteListingContext = () => useContext(WebsiteListingContext);

WebsiteListingContextProvider.propTypes = {
    children: PropTypes.node,
};
