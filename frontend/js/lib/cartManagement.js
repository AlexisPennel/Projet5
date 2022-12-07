let quantityValue = (e) => {
    if (e.quantity < 1 || e.quantity > 100) {
        return -1
    };
};

let modifyQuantity = (cartArray, product) => {
    for (let i in cartArray) {
        if (product.id === cartArray[i].id && product.color === cartArray[i].color) {
            if (parseFloat(cartArray[i].quantity) + parseFloat(product.quantity) > 100) {
                alert('maximum 100 articles');
                return false
            }
            cartArray[i].quantity = parseFloat(cartArray[i].quantity) + parseFloat(product.quantity);
            console.log(cartArray);
            return true
        };
    };
};

let getCartArray = () => {
    if (localStorage.length != 0) {
        console.log('local storage full');
        return JSON.parse(localStorage.getItem('cartArray'));
    }

    console.log('return');
    return [];
};

export { modifyQuantity, getCartArray, quantityValue };