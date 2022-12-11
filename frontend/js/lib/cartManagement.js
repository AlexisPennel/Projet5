const quantityCheck = (quantity) => {
    if (quantity < 1 || quantity > 100 || isNaN(quantity)) {
        return false
    };
    return true
};

const addProduct = (productId, colorSelect, quantityInput) => {
    const cartArray = getCartArray();
    const ProductSameIdSameColor = cartArray.find(element => element.id === productId && element.color === colorSelect);
    // console.log(ProductSameIdSameColor.quantity);


    if (ProductSameIdSameColor) {
        console.log('Produit avec le même id et la même couleur');
        if (quantityCheck(parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput))) {
            ProductSameIdSameColor.quantity = parseInt(ProductSameIdSameColor.quantity) + parseInt(quantityInput);
            console.log("quantité valide");
            // console.log(cartArray);
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            
            console.log(localStorage);
            return
        }
        console.log("quantité invalide")
        return -1
    }

    if (quantityCheck(quantityInput)) {

        console.log('aucun élement similaire et quantité valide');
        const product = {
            id: productId,
            quantity: quantityInput,
            color: colorSelect
        };
        cartArray.push(product);
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        console.log(localStorage);
        return
    }

    console.log("quantité invalide")
    return -1
};

const getCartArray = () => {
    if (localStorage.length != 0) {
        return JSON.parse(localStorage.getItem('cartArray'));
    }

    return [];
};

export { addProduct, getCartArray, quantityCheck };