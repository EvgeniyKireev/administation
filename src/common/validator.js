function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password) {
    if (password.length >6) {
        return true;
    }
    return false;
}
let validPhone = (myPhone) => {
    let re = /^\d[\d\(\)\ -]{4,14}\d$/;
    return re.test(myPhone);

}
let validName = (value) => {
    let regExp = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}\-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/
    return regExp.test(value)
}
let emailInStore = (arr, key) => {
    let cond = arr.some(function(e){
        return e.email == key;
    });

    if(cond){
      return true

    }else{
        return false
    }
}
export const validate = {validateEmail, validatePassword, validPhone, validName, emailInStore}