import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './loadingComponent.css'

const LoadingComponent = (props: any) => {
    const { message } = props
    return (
        <div className='loading-container'>
            <div className='loading-message'>
                <h2>{message}</h2>
                <CircularProgress color="inherit" />
            </div>
        </div>
    );
}

export default LoadingComponent