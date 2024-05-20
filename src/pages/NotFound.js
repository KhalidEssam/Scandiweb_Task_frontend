import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router


const NotFound = () => {

    return (
        <>

            <div style={styles.container}>
                <div style={styles.content}>

                    <div className="h4" style={styles.heading}>
                        404 - Page Not Found
                    </div>
                    <div style={styles.text}>
                        Oops! The page you are looking for might be in another galaxy.
                    </div>
                    <Link to="/" style={styles.link} >
                        Go back to home
                    </Link>
                </div>
            </div>



        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        // backgroundColor: '#f0f0f0', 
    },
    content: {
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        // backgroundColor: '#fff',
    },
    icon: {
        fontSize: '4em',
        color: '#ff5252', // Material-UI red color
        marginBottom: '20px',
    },
    heading: {
        margin: '10px 0',
    },
    text: {
        marginBottom: '20px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default NotFound;
