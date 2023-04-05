import React from 'react'

const HelpScreen = () => {
    return (
        <div>
            <p>
                This script can be used to display a range of numbered images.
            </p>
            <p>
                Such as sites like photobucket, etc where you have the link but
                directory browsing is disabled.
            </p>
            <p>
                Common image names are <i>IMG_001.jpg</i>, <i>DSC_001.jpg</i>,
                etc where <i>IMG</i> and <i>DSC</i> are default image names from
                digital camera manufacturers.
            </p>
            <p>Please enter a valid URL including the number range.</p>
            <p>
                Make sure there are no spaces before or after the url you enter,
                or the photos will not load properly.
            </p>
            <p>
                An example URL might look like
                http://www.google.nl/images/hp[0-3].gif
            </p>
            <a href='?http://www.google.nl/images/hp%5B0-3%5D.gif'>
                Click here for an example
            </a>
        </div>
    )
}

export default HelpScreen
