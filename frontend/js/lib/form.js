// Retrait des messages d'erreur (champs de saisie)
const removeError = () => {
    document.getElementById('firstNameErrorMsg').innerHTML = '';
    document.getElementById('lastNameErrorMsg').innerHTML = '';
    document.getElementById('addressErrorMsg').innerHTML = '';
    document.getElementById('cityErrorMsg').innerHTML = '';
    document.getElementById('emailErrorMsg').innerHTML = '';
};

// Fonction de vérification pour le champ "Prenom" qui renvoie FALSE si le champ est vide, avec des espaces ou si la vérification avec la REGEX n'est pas valide  
const firstNameCheck = (firstName) => {
    // Vérification que le champ "first name" n'est pas vide 
    if (firstName.trim() === '') {
        document.getElementById('firstNameErrorMsg').innerHTML = 'Le champ "Prénom" ne peut pas être vide';
        return false
    };

    // Déclaration regex
    const regexFirst = new RegExp(/^[a-zA-Z\u0080-\u024F\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\s]+)*$/, 'g');
    let resultFirstName = regexFirst.test(firstName);
    
    // Vérification de "first name" avec la regex 
    if (resultFirstName === false) {
        document.getElementById('firstNameErrorMsg').innerHTML = 'Le champ "Prénom" est incorrect';
        return false
    };

    return true
};

// Fonction de vérification pour le champ "nom" qui renvoie FALSE si le champ est vide, avec des espaces ou si la vérification avec la REGEX n'est pas valide  
const lastNameCheck = (lastName) => {
    
    // Vérification que le champ "last name" n'est pas vide 
    if (lastName.trim() === '') {
        document.getElementById('lastNameErrorMsg').innerHTML = 'Le champ "Nom" ne peut pas être vide';
        return false
    };

    // Déclaration regex
    const regexLast = new RegExp(/^[a-zA-Z\u0080-\u024F\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\s]+)*$/, 'g');
    let resultLastName = regexLast.test(lastName);
   
    // Vérification de "last name" avec la regex 
    if (resultLastName === false) {
        document.getElementById('lastNameErrorMsg').innerHTML = 'Le champ "Nom" est incorrect';
        return false
    };
    return true
    
};

// Fonction de vérification pour le champ "adresse" qui renvoie FALSE si le champ est vide, avec des espaces ou si la vérification avec la REGEX n'est pas valide 
const addressCheck = (address) => {

    // Vérification que le champ "adresse" n'est pas vide 
    if (address.trim() === '') {
        document.getElementById('addressErrorMsg').innerHTML = 'Le champ "Adresse" ne peut pas être vide';
        return false
    };

    // Déclaration regex
    const regexAddress = new RegExp(/^[a-zA-Z\u0080-\u024F\d\s\"]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\d\s\"]+)*$/, 'g');
    let resultAddress = regexAddress.test(address)
    
    // Vérification de "adresse" avec la regex 
    if (resultAddress === false) {
        document.getElementById('addressErrorMsg').innerHTML = `Le champ "Adresse" est incorrect`;
        return false
    }

    return true
};

// Fonction de vérification pour le champ "Ville" qui renvoie FALSE si le champ est vide, avec des espaces ou si la vérification avec la REGEX n'est pas valide 
const cityCheck = (city) => {

    // Vérification que le champ "ville" n'est pas vide 
    if (city.trim() === '') {
        document.getElementById('cityErrorMsg').innerHTML = 'Le champ "Ville" ne peut pas être vide';
        return false
    };

    // Déclaration regex
    const regexCity = new RegExp(/^[a-zA-Z\u0080-\u024F\d\s]+(?:(\-|\'|\.){1}[a-zA-Z\u0080-\u024F\d\s]+)*$/, 'g');
    let resultCity = regexCity.test(city);

    // Vérification de "Ville" avec la regex 
    if (resultCity === false) {
        document.getElementById('cityErrorMsg').innerHTML = 'Le champ "Ville" est incorrect ';
        return false
    }

    return true

};

// Fonction de vérification pour le champ "Email" qui renvoie FALSE si le champ est vide, avec des espaces ou si la vérification avec la REGEX n'est pas valide 
const emailCheck = (email) => {

    // Vérification que le champ "email" n'est pas vide 
    if (email.trim() === '') {
        document.getElementById('emailErrorMsg').innerHTML = 'Le champ "Email" ne peut pas être vide';
        return false
    };

    // Déclaration regex
    const regexEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'gm');
    const resultEmail = regexEmail.test(email);

    // Vérification de "Email" avec la regex 
    if (resultEmail === false) {
        document.getElementById('emailErrorMsg').innerHTML = `Le champ "email" est incorrect`;
        return false
    };

    return true
};

// Fonction qui appelle les fonctions de vérification des champs de saisie qui renvoie TRUE si toutes les vérifications sont valides 
const isFormValid = (firstName, lastName, address, city, email) => {

    let formValid = true; 

    // Vérification "prénom" 
    if (firstNameCheck(firstName) === false) {
      formValid = false;
    };

    // Vérification "nom"
    if (lastNameCheck(lastName) === false) {
      formValid = false;
    };

    // Vérification "adresse" 
    if (addressCheck(address) === false) {
      formValid = false;
    };

    // Vérification "ville"
    if (cityCheck(city) === false) {
      formValid = false;
    };

    // Vérification "email" 
    if (emailCheck(email) === false) {
      formValid = false;
    };

   return formValid
  };

// Exportation des fonctions  
export {removeError, firstNameCheck, lastNameCheck, addressCheck, cityCheck, emailCheck, isFormValid };