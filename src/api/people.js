const getPeople = async (page = 1) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getCharacter = async (id = 1) => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const searchCharacter = async (name) => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${name}`
    );
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}

export { getPeople, getCharacter, searchCharacter };
