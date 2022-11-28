let canapData = "";

const getCanap = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    return canapData = -1;
  }
};

export {getCanap, canapData};