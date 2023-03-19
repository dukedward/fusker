const form1 = document.querySelector('#form1')
let strParameter = window.location.search

const DisplayHelp = () => {
    document.form1.URL.value = ''
    HandleSubmit()
}

const HandleSubmit = (e) => {
    // console.log(form1.URL.value)
    strParameter = form1.URL.value
    strParameter = strParameter.replace(/\[/g, '%5B')
    strParameter = strParameter.replace(/]/g, '%5D')
    top.location = `${window.location.pathname}?${strParameter}`
    e.preventDefault()
}

const GenerateContent = () => {
    strParameter = strParameter.substring(1, strParameter.length)
    if (strParameter == '') {
        document.writeln(
            'This script can be used to display a range of numbered images.<br>'
        )
        document.writeln(
            'Such as sites like photobucket, etc where you have the link but directory browsing is disabled.<br>'
        )
        document.writeln(
            'Common image names are <i>IMG_001.jpg</i>, <I>DSC_001.jpg</i>, etc where <i>IMG</i> and <i>DSC</i> are default image names from digital camera manufacturers.<br>'
        )
        document.writeln(
            'Please enter a valid URL including the number range.<br>'
        )
        document.writeln(
            'Make sure there are no spaces before or after the url you enter, or the photos will not load properly.<br>'
        )
        document.writeln(
            'An example URL might look like http://www.fuckingright.com/images/jeri_ryan[1-20].jpg<br>'
        )
        document.writeln(
            '<a href="index.html?http://www.google.nl/images/hp%5B0-3%5D.gif">Click here for an example</a><br><br>'
        )
    } else {
        if (strParameter.indexOf('://') < 0) {
            strParameter = `http://${strParameter}`
        }
        strParameter = strParameter.replace(/%5B/g, '[')
        strParameter = strParameter.replace(/%5D/g, ']')
        form1.URL.value = strParameter
        ProcessURL('', strParameter)
    }
}

const RemoveLeadingZeros = (strInput) => {
    i = 0
    while (strInput.substring(i, 1) == '0') {
        i++
    }

    if (strInput.length == i) {
        strInput = '0'
    } else {
        strInput = strInput.substring(i)
    }
    return strInput
}

const WriteURLtoDocument = (strURL) => {
    document.writeln(`
        <p>
            <img src="${strURL}">
            <br>
            <a href="${strURL}">${strURL}</a>
        </p>
    `)
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
    // console.log(`strFirstPart: ${strFirstPart}`)
    strLastPart = new String(strLastPart)
    // console.log(`strLastPart: ${strLastPart}`)

    let iBegin = strLastPart.indexOf('[')
    // console.log(`iBegin: ${iBegin}`)
    let iEnd = strLastPart.indexOf(']')
    // console.log(`iEnd: ${iEnd}`)
    if (iBegin < 0 || iEnd < 0) {
        WriteURLtoDocument(strFirstPart + strLastPart)
        return -1
    }

    strBegin = strFirstPart + strLastPart.substr(0, iBegin)
    // console.log(`strBegin:  ${strBegin}`)
    strEnd = strLastPart.substr(iEnd + 1, strLastPart.length - iEnd)
    // console.log(`strEnd: ${strEnd}`)

    strTemp = strLastPart.substr(iBegin + 1, iEnd - iBegin - 1)
    // console.log(`strTemp: ${strTemp}`)
    let iDash = strTemp.indexOf('-')
    // console.log(`iDash: ${iDash}`)

    if (iDash < 0) {
        WriteURLtoDocument(strFirstPart + strLastPart)
        return -1
    }

    let strStartNr = strTemp.substr(0, iDash)
    // console.log(`strStartNr 1: ${strStartNr}`)
    iDigits = strStartNr.length
    // console.log(`iDigits: ${iDigits}`)
    strStartNr = RemoveLeadingZeros(strStartNr)
    // console.log(`strStartNr 2: ${strStartNr}`)

    let strEndNr = strTemp.substr(iDash + 1, strTemp.length - iDash - 1)
    // console.log(`strEndNr 1: ${strEndNr}`)
    strEndNr = RemoveLeadingZeros(strEndNr)
    // console.log(`strEndNr 2: ${strEndNr}`)

    if (isNaN(strStartNr) == true || isNaN(strEndNr) == true) {
        WriteURLtoDocument(strFirstPart + strLastPart)
        return -1
    }

    iStartNr = parseInt(strStartNr)
    // console.log(`iStartNr: ${iStartNr}`)
    iEndtNr = parseInt(strEndNr)
    // console.log(`iEndtNr: ${iEndtNr}`)

    for (i = iStartNr; i <= iEndtNr; i++) {
        let strNr = new String(i)
        while (strNr.length < iDigits) {
            strNr = `0${strNr}`
            // console.log(`strNr: ${strNr}`)
        }
        strTemp = strBegin + strNr
        ProcessURL(strTemp, strEnd)
    }
}

form1.addEventListener('submit', HandleSubmit)
document.onload = GenerateContent()
