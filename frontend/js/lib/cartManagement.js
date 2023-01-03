// Récupération de l'array "panier" s'il existe. => sinon création de l'array "panier"
const getCartArray = () => {
    if (localStorage.length != 0) {
        return JSON.parse(localStorage.getItem('cartArray'));
    }

    return [];
};

// Si la quantité passée en paramètre de la fonction n'est pas comprise entre 1 et 100 ou qu'il ne s'agit pas d'un nombre, return "false". => sinon return "true".
const quantityCheck = (quantity) => {
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
        return false
    };
    return true
};

//  Vérification si la couleur est bien selectionner => Si non, return "-1". Vérification qu'un produit identique existe dans le panier (modèle et couleur identique) => si oui, vérification de la somme des deux quantités => si la somme est correcte, incrémentation de la quantité de l'élément du panier => si non return "-2". Si aucun produit identique => vérification de la quantité => si correct, création de l'objet "product" et ajout dans l'array et mise à jour du localStorage. => sinon return "-2". 
const addProduct = (productId, colorSelect, quantityInput, name) => {
    const cartArray = getCartArray();
    const productInCartArray = cartArray.find(element => element.id === productId && element.color === colorSelect);

    if (colorSelect === "") {
        return -1
    };

    if (productInCartArray) {
        if (quantityCheck(parseInt(productInCartArray.quantity) + parseInt(quantityInput))) {
            productInCartArray.quantity = parseInt(productInCartArray.quantity) + parseInt(quantityInput);
            localStorageUpdate('cartArray', cartArray)
            return
        }

        return -2
    };

    if (quantityCheck(quantityInput)) {
        const product = {
            name: name,
            id: productId,
            quantity: quantityInput,
            color: colorSelect
        };
        cartArray.push(product);
        localStorageUpdate('cartArray', cartArray);
        return
    };
    return -2
};

// Multiplication des nombres passés en paramètre 
const multiply = (number1, number2) => {
    const result = number1 * number2
    return result
};

// Calcul du montant total du panier
const sum = () => {
    let sum = 0;
    const productData = JSON.parse(localStorage.getItem('productData'));
    for (let i in productData) {
        sum += productData[i].totalPrice
    }
    return sum
};

//  Calcul de la quantité totale d'article dans le panier. => Si aucun article dans le panier, message d'erreur et redirection page d'accueil 
const sumQuantity = () => {
    let sum = 0;
    const productData = JSON.parse(localStorage.getItem('productData'));
    for (let i in productData) {
        sum += parseInt(productData[i].quantity);
    }

    if (sum === 0) {
        alert('aucun produit dans votre panier');
        window.location.href = `./index.html`;
    }

    return sum

};

// Mise à jour du local Storage 
const localStorageUpdate = (key, array) => {
    localStorage.setItem(`${key}`, JSON.stringify(array));
};

// Vérification de la taille du array "panier"
const cartLengthCheck = (array) => {
    if (array.length === 0) {
        alert('aucun produit dans votre panier')
        window.location.href = `./index.html`;
    };
};


// Exportation des fonctions 
export { addProduct, getCartArray, quantityCheck, sum, multiply, localStorageUpdate, sumQuantity, cartLengthCheck };