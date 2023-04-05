import React, { useEffect, useState } from 'react'
import HelpScreen from './HelpScreen'
import ImageContent from './ImageContent'

const Form = () => {
    let strParameter = window.location.search
    let imgs = []
    const [showHelp, setShowHelp] = useState(false)
    const [content, setContent] = useState([])
    const ClearText = () => {
        document.form1.URL.value = ''
    }
    const HandleSubmit = (e) => {
        strParameter = document.form1.URL.value
        strParameter = strParameter.replace(/\[/g, '%5B')
        strParameter = strParameter.replace(/]/g, '%5D')
        window.location = `${window.location.pathname}?${strParameter}`
        e.preventDefault()
        setShowHelp(false)
    }
    const DisplayHelp = () => {
        setShowHelp(!showHelp)
    }
    const RemoveLeadingZeros = (strInput) => {
        let i = 0
        while (strInput.substring(i, 1) === '0') {
            i++
        }

        if (strInput.length === i) {
            strInput = '0'
        } else {
            strInput = strInput.substring(i)
        }
        return strInput
    }
    const ProcessURL = (strFirstPart, strLastPart) => {
        let strBegin = ''
        let strEnd = ''
        let iStartNr = -1
        let iEndtNr = -1
        let iDigits = 0
        let strTemp
        let i

        strFirstPart = new String(strFirstPart)
        strLastPart = new String(strLastPart)

        let iBegin = strLastPart.indexOf('[')
        let iEnd = strLastPart.indexOf(']')
        if (iBegin < 0 || iEnd < 0) {
            imgs.push(strFirstPart + strLastPart)
            console.log(imgs)
            return -1
        }

        strBegin = strFirstPart + strLastPart.substr(0, iBegin)
        strEnd = strLastPart.substr(iEnd + 1, strLastPart.length - iEnd)

        strTemp = strLastPart.substr(iBegin + 1, iEnd - iBegin - 1)
        let iDash = strTemp.indexOf('-')

        if (iDash < 0) {
            console.log(strFirstPart + strLastPart)
            imgs.push(strFirstPart + strLastPart)
            return -1
        }

        let strStartNr = strTemp.substr(0, iDash)
        iDigits = strStartNr.length
        strStartNr = RemoveLeadingZeros(strStartNr)

        let strEndNr = strTemp.substr(iDash + 1, strTemp.length - iDash - 1)
        strEndNr = RemoveLeadingZeros(strEndNr)

        if (isNaN(strStartNr) === true || isNaN(strEndNr) === true) {
            console.log(strFirstPart + strLastPart)
            imgs.push(strFirstPart + strLastPart)
            return -1
        }

        iStartNr = parseInt(strStartNr)
        iEndtNr = parseInt(strEndNr)

        for (i = iStartNr; i <= iEndtNr; i++) {
            let strNr = new String(i)
            while (strNr.length < iDigits) {
                strNr = `0${strNr}`
            }
            strTemp = strBegin + strNr
            ProcessURL(strTemp, strEnd)
        }
        console.log(imgs)
        setContent(imgs)
    }

    useEffect(() => {
        strParameter = strParameter.substring(1, strParameter.length)
        if (strParameter === '') {
            DisplayHelp()
        }
        if (strParameter !== '' && strParameter.indexOf('://') < 0) {
            strParameter = `http://${strParameter}`
        }
        strParameter = strParameter.replace(/%5B/g, '[')
        strParameter = strParameter.replace(/%5D/g, ']')
        document.form1.URL.value = strParameter
        ProcessURL('', strParameter)
    }, [strParameter])

    return (
        <form name='form1' id='form1' onSubmit={HandleSubmit}>
            <h1>JavaScript Fusker</h1>
            <p>
                <i>Click the help button for how to use this site</i>
            </p>
            <div>
                <b>URL:</b>
                <input type='text' size='60' name='URL' onClick={ClearText} />
                <input
                    type='button'
                    name='SubmitButton'
                    value='Submit'
                    onClick={HandleSubmit}
                />
                <input
                    type='button'
                    name='HelpButton'
                    value='Help'
                    onClick={DisplayHelp}
                />
            </div>
            {showHelp && <HelpScreen />}
            {content &&
                content.map((pic) => <ImageContent key={pic} strURL={pic} />)}
        </form>
    )
}

export default Form
