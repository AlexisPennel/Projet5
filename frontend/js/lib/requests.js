const getCanap = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    return -1;
  }
  
  return await response.json();
};

export { getCanap };