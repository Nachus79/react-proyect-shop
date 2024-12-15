import axios from 'axios';

const API_URL = 'https://www.mmobomb.com/api1/latestnews';


const getGamingNews = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        locale: 'it_IT',
        country: 'it',
        language: 'it',
        timezone: '+01:00'
      },
      headers: {
        'x-rapidapi-host': 'mmobomb.com/api1/latestnews',
    
      }
    });
    return response.data;
  } catch (error) {
    console.error('404: :', error);
    return [];
  }
};

export default getGamingNews;
``

