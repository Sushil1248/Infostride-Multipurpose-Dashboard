import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

// Define CSS for the loader container and spinner
const styles = {
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderTop: '4px solid #333',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
    },
};

export default function Loader({ type }) {
    return (
        <div style={styles.loaderContainer}>
            {type === 'default' ? (
                // Render a spinning loader if type is 'default'
                <CircularProgress color="inherit" />
            ) : (
                // Render custom content if type is not 'default'
                <div>sushil</div>
            )}
        </div>
    );
}

Loader.propTypes = {
    type: PropTypes.oneOf(['default']),
};
