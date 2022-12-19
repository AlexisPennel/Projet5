const quantityCheck = (quantity) => {
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
        return false
    };
    return true
};

const addProduct = (productId, colorSelect, quantityInput) => {
    const cartArray = getCartArray();
    const productInCartArray = cartArray.find(element => element.id === productId && element.color === colorSelect);

    if (productInCartArray) {
        if (quantityCheck(parseInt(productInCartArray.quantity) + parseInt(quantityInput))) {
            productInCartArray.quantity = parseInt(productInCartArray.quantity) + parseInt(quantityInput);
            localStorageUpdate('cartArray', cartArray)
            console.log(localStorage);
            return
        }

        return -1
    }

    if (quantityCheck(quantityInput)) {
        const product = {
            id: productId,
            quantity: quantityInput,
            color: colorSelect
        };
        cartArray.push(product);
        localStorageUpdate('cartArray', cartArray);
        return
    }
    return -1
};

const getCartArray = () => {
    if (localStorage.length != 0) {
        return JSON.parse(localStorage.getItem('cartArray'));
    }

    return [];
};

const multiply = (number1, number2) => {
    const result = number1 * number2
    return result
};

const sum = () => {
    let sum = 0;
    const productData = JSON.parse(localStorage.getItem('productData'));
    for (let i in productData) {
        sum += productData[i].totalPrice
    }
    return sum
};

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

const localStorageUpdate = (key, array) => {
    localStorage.setItem(`${key}`, JSON.stringify(array));
};

const cartLengthCheck = (array) => {
    if (array.length === 0) {
        alert('aucun produit dans votre panier')
        window.location.href = `./index.html`;
    };
};



export { addProduct, getCartArray, quantityCheck, sum, multiply, localStorageUpdate, sumQuantity, cartLengthCheck };