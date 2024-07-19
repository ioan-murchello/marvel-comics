const baseUrl = 'https://gateway.marvel.com:443/v1/public/';

const apiKey = `apikey=${import.meta.env.VITE_API_KEY}`;

const baseOffset = 210;
const limit = 9;

export const onRequest = async (offset = 210) => {
  try {
    const res = await fetch(
      `${baseUrl}characters?limit=${limit}&offset=${offset}&${apiKey}`
    );

    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  } catch (error) {
    console.log('Could not fetch...', error);
    return null;
  }
};

export const getResource = async () => {
  try {
    const res = await fetch(
      `${baseUrl}characters?limit=${limit}&offset=${baseOffset}&${apiKey}`
    );
    if (!res.ok) {
      throw new Error('Some problem to load characters');
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCharacter = async (id) => {
  try {
    const res = await fetch(`${baseUrl}characters/${id}?${apiKey}`);

    if (!res.ok) {
      throw new Error(res.status);
    }

    return await res.json();
  } catch (error) {
    console.log('Char was not found..');
    return null;
  }
};

export const getAllComics = async (offset = 0) => {
  try {
    const res = await fetch(
      `${baseUrl}comics?orderBy=issueNumber&limit=14&offset=${offset}&${apiKey}`
    );

    if (!res.ok) {
      throw new Error('Some problem to load comics...');
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getComic = async (id) => {
  try {
    const res = await fetch(`${baseUrl}comics/${id}?${apiKey}`);
    if(!res.ok){
      throw new Error('Some problem to load comic...')
    }
    return await res.json();
  } catch (error) {
    console.log(error)
    return null
  }
};
