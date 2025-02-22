

const BASE_URL = 'https://pokeapi.co/api/v2';

const request = async (
    endpoint,
    method = 'GET',
    body = null,
    ) => {
    // Configurer la requête
    const config = {
    method,
    ...(body && { body: JSON.stringify(body) }),
    };
    try {
    // Envoyer la requête
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    // Gérer la réponse
    if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Something went wrong');
    }
    // Vérifier si la réponse a du contenu
    const contentType = response.headers.get('content-type');
    return contentType && contentType.includes('application/json')
    ? await response.json()
    : null;
    } catch (error) {
    // Gestion des erreurs
    console.error('API Error:', error);
    throw error;
    }
    };

    const getPoke = (endpoint) => {
        return request(`/${endpoint}`, 'GET', null);
        };


export { getPoke };

