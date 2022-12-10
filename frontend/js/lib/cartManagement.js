const quantityCheck = (quantity) => {
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
        return false
    };
    return true
};

const addProduct = (productId, colorSelect, quantityInput) => {
    const cartArray = getCartArray();
    const ProductSameIdSameColor = cartArray.find(element => element.id === productId && element.color === colorSelect);
    console.log(ProductSameIdSameColor.quantity);
    

    if (ProductSameIdSameColor) {
        console.log('Produit avec le même id et la même couleur');
        if (quantityCheck(parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput))) {
            ProductSameIdSameColor.quantity = parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput);
            // console.log ("quantité valide");
            // console.log(cartArray);
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            // console.log(localStorage);
            return
        }
        console.log ("quantité invalide")
        return
    }

    console.log('nan');

    // console.log('aucun élement similaire');
    // cartArray.push(product);
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
    
    // const product = {
    //     id: productId,
    //     quantity: quantityInput,
    //     color: colorSelect
    // };
    
    // console.log(cartArray);
    // console.log(productId);
    // console.log(colorSelect);
    // console.log(quantityInput);







    // for (let i in cartArray) {
    //     if (product.id === cartArray[i].id && product.color === cartArray[i].color) {
    //         if (quantityValue(parseInt(cartArray[i].quantity) + parseInt(product.quantity)) === -1) {

    //             return false
    //         }
    //         cartArray[i].quantity = parseInt(cartArray[i].quantity) + parseInt(product.quantity);
    //         return true
    //     };
    // };
};

const getCartArray = () => {
    if (localStorage.length != 0) {
        return JSON.parse(localStorage.getItem('cartArray'));
    }

    return [];
};

export { addProduct, getCartArray, quantityCheck};