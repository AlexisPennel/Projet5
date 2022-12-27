// Fonction qui utilise la méthode fetch avec l'URL passée en paramètre pour récupérer les données transmises par l'API 
const getCanap = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return -1;
  }

  return await response.json();
};

// Fonction qui permet l'envoi du formulaire de contact et du tableau de produits, et qui récupère et retourne la réponse au format JSON si la requête post est correcte. Dans le cas contraire elle retourne "-1"
const postData = async (contact, array) => {
  const response = await fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      contact: contact,
      products: array,
    }),
  });

  if (!response.ok) {
    return -1
  }
  return await response.json();
};

// Exportation des fonctions 
export { getCanap, postData };