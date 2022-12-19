
const removeError = () => {
    document.getElementById('firstNameErrorMsg').innerHTML = '';
    document.getElementById('lastNameErrorMsg').innerHTML = '';
    // document.getElementById('firstNameErrorMsg').innerHTML = 'le champ est vide';
    // document.getElementById('firstNameErrorMsg').innerHTML = 'le champ est vide';
};


const namesCheck = (firstName, lastName) => {
    // vérification que le champ first name n'est pas vide 
    if (firstName.trim() === '') {
        document.getElementById('firstNameErrorMsg').innerHTML = 'le champ est vide';
        return false
    };

    // vérification que le champ last name n'est pas vide 
    if (lastName.trim() === '') {
        document.getElementById('lastNameErrorMsg').innerHTML = 'le champ est vide';
        return false
    };

    // regex
    const regexFirst = new RegExp(/^[a-z-áàäâãèéëêìïîíóòöôõùûüúç\s\-\,]+$/, 'gi');
    const regexLast = new RegExp(/^[a-z-áàäâãèéëêìïîíóòöôõùûüúç\s\-\,]+$/, 'gi');
    let resultFirstName = regexFirst.test(firstName);
    let resultLastName = regexLast.test(lastName);

    // vérificationm first name regex 
    if (resultFirstName === false) {
        document.getElementById('firstNameErrorMsg').innerHTML = 'le prénom est invalide';
        return false
    };

    // vérificationm last name regex 
    if (resultLastName === false) {
        document.getElementById('lastNameErrorMsg').innerHTML = 'le nom est invalide';
        return false
    };

   return true 
};

const addressCheck = (address, city) => {
    if (address.trim() === '') {
        document.getElementById('addressErrorMsg').innerHTML = 'le champ est vide';
        return false
    };

    if (city.trim() === '') {
        document.getElementById('cityErrorMsg').innerHTML = 'le champ est vide';
        return false
    };
};

const emailCheck = (email) => {
    if (email.trim() === '') {
        document.getElementById('emailErrorMsg').innerHTML = 'le champ est vide';
        return false
    };

    const regexEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'gm');
    const resultEmail = regexEmail.test(email);

    if(resultEmail === false) {
        document.getElementById('emailErrorMsg').innerHTML = `l'email est invalide`;
        return false
    };

    return true
};

export { namesCheck, removeError, addressCheck,emailCheck };