
// récupération de l'id de la commande
const urlId = window.location.search;
const urlSearchParams = new URLSearchParams(urlId);
const productId = urlSearchParams.get('id');

// Affichage de l'id dans la confirmation 
document.getElementById('orderId').innerHTML = productId
