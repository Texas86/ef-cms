import axios from 'axios';

export const api = {
  getHello: async baseUrl => {
    try {
      const response = await axios.get(`${baseUrl}/hello`);
      return response.data;
    } catch (error) {
      return 'Bad response!';
    }
  },
};