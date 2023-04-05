import React from 'react'

const ImageContent = ({ strURL }) => {
    return (
        <div>
            <img src={strURL} alt='' />
            <p>
                <a href={strURL}>{strURL}</a>
            </p>
        </div>
    )
}

export default ImageContent
