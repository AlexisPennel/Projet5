const quantityCheck = (quantity) => {
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
        return false
    };
    return true
};

const addProduct = (productId, colorSelect, quantityInput) => {
    const cartArray = getCartArray();
    const ProductSameIdSameColor = cartArray.find(element => element.id === productId && element.color === colorSelect);

    if (ProductSameIdSameColor) {
        if (quantityCheck(parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput))) {
            ProductSameIdSameColor.quantity = parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput);
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
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
    const totalPrices = JSON.parse(localStorage.getItem('productData'));
    for (let i in totalPrices) {
        sum += totalPrices[i].totalPrice
    }
    return sum
};

const localStorageUpdate = ( key, array) => {
    localStorage.setItem(`${key}`, JSON.stringify(array));
};



export { addProduct, getCartArray, quantityCheck, sum, multiply, localStorageUpdate };