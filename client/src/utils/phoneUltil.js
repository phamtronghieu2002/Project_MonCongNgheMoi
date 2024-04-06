const PNF = require('google-libphonenumber').PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function formatPhoneNumber(number) {
    return number.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
}


export const checkValidPhoneNumber =(phonenumber,countryCode)=>{
    const number = phoneUtil.parseAndKeepRawInput(formatPhoneNumber(phonenumber), countryCode);
    console.log('====================================');
    console.log(number);
    console.log('====================================');
    const checkPosibleNumber = phoneUtil.isPossibleNumber(number);
    const checkValidNumber = phoneUtil.isValidNumber(number);
    const checkValidNumberForRegion = phoneUtil.isValidNumberForRegion(number, countryCode);
    if(checkPosibleNumber && checkValidNumber && checkValidNumberForRegion){
        return true;
    }
    return false;
}