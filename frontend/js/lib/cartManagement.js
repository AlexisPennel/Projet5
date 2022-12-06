

let modifyQuantity = (cartArray, product) => {
    for (let i in cartArray) {
        if (product.id === cartArray[i].id && product.color === cartArray[i].color) {
            cartArray[i].quantity = parseFloat(cartArray[i].quantity) + parseFloat(product.quantity);
            console.log('same id and same color, only quantity changed');
            console.log(cartArray);
            return -1
        };
    };
}

export {modifyQuantity};