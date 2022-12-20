const getCanap = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return -1;
  }
  
  return await response.json();
};

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

  if(!response.ok){
    return -1
  }
  return await response.json();
};

export { getCanap, postData };