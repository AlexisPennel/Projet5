
const removeError = () => {
    document.getElementById('firstNameErrorMsg').innerHTML = '';
    document.getElementById('lastNameErrorMsg').innerHTML = '';
    document.getElementById('addressErrorMsg').innerHTML = '';
    document.getElementById('cityErrorMsg').innerHTML = '';
    document.getElementById('emailErrorMsg').innerHTML = '';
};


const firstNameCheck = (firstName) => {
    // vérification que le champ first name n'est pas vide 
    if (firstName.trim() === '') {
        document.getElementById('firstNameErrorMsg').innerHTML = 'le champ est vide';
        return false
    };

    // regex
    const regexFirst = new RegExp(/^[a-zA-Z\u0080-\u024F\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\s]+)*$/, 'g');
    let resultFirstName = regexFirst.test(firstName);
    
    // vérificationm first name regex 
    if (resultFirstName === false) {
        document.getElementById('firstNameErrorMsg').innerHTML = 'Le prénom est incorrect';
        return false
    };

    return true
};

const lastNameCheck = (lastName) => {
    
    // vérification que le champ last name n'est pas vide 
    if (lastName.trim() === '') {
        document.getElementById('lastNameErrorMsg').innerHTML = 'Le champ est vide';
        return false
    };

    // regex
    const regexLast = new RegExp(/^[a-zA-Z\u0080-\u024F\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\s]+)*$/, 'g');
    let resultLastName = regexLast.test(lastName);
   
    // vérificationm last name regex 
    if (resultLastName === false) {
        document.getElementById('lastNameErrorMsg').innerHTML = 'Le nom est incorrect';
        return false
    };
    return true
    
};


const addressCheck = (address) => {

    // vérification que le champ adresse n'est pas vide 
    if (address.trim() === '') {
        document.getElementById('addressErrorMsg').innerHTML = 'Le champ est vide';
        return false
    };

    // verif adresse (regex)
    const regexAddress = new RegExp(/^[a-zA-Z\u0080-\u024F\d\s\"]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\d\s\"]+)*$/, 'g');
    let resultAddress = regexAddress.test(address)

    if (resultAddress === false) {
        document.getElementById('addressErrorMsg').innerHTML = `L'adresse est incorrect`;
        return false
    }

    return true
};

const cityCheck = (city) => {

    // vérification que le champ ville n'est pas vide 
    if (city.trim() === '') {
        document.getElementById('cityErrorMsg').innerHTML = 'Le champ est vide';
        return false
    };

    // verif ville (regex)
    const regexCity = new RegExp(/^[a-zA-Z\u0080-\u024F\d\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\d\s]+)*$/, 'g');
    let resultCity = regexCity.test(city);

    if (resultCity === false) {
        document.getElementById('cityErrorMsg').innerHTML = 'La ville est incorrect ';
        return false
    }

    return true

};

const emailCheck = (email) => {

    // vérification que le champ email n'est pas vide 
    if (email.trim() === '') {
        document.getElementById('emailErrorMsg').innerHTML = 'Le champ est vide';
        return false
    };

    // verif email (regex)
    const regexEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'gm');
    const resultEmail = regexEmail.test(email);

    if (resultEmail === false) {
        document.getElementById('emailErrorMsg').innerHTML = `L'email est incorrect`;
        return false
    };

    return true
};

const isFormValid = (firstName, lastName, address, city, email) => {

    let formValid = true; 
    // Verif prénom 
    if (firstNameCheck(firstName) === false) {
      formValid = false;
    };

    // Verif nom
    if (lastNameCheck(lastName) === false) {
      formValid = false;
    };

    // Verif adresse 
    if (addressCheck(address) === false) {
      formValid = false;
    };

    // Verif ville
    if (cityCheck(city) === false) {
      formValid = false;
    };

    // Verif email 
    if (emailCheck(email) === false) {
      formValid = false;
    };

    if (formValid) {
      return true 
    }

    return false 
  };
  
export {removeError, firstNameCheck, lastNameCheck, addressCheck, cityCheck, emailCheck, isFormValid };