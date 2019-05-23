import React from 'react'

type Props = {
    message: string
}

const ErrorComponent = (props: Props) => {
    const { message } = props

    return (
        <div className='error-container list-card'>
            <h2>Uh-oh !</h2>
            <h4>Looks like there's a problem</h4>
            <p><i>{message}</i></p>
        </div>
    )
}

export default ErrorComponent