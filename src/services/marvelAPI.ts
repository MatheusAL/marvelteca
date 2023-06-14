var md5 = require("md5");
const BASE_URL: string = "https://gateway.marvel.com/v1/public";
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const marvelService = {
  get: async (endpoint: string, filters: string) => {
    try {
      const timestamp = new Date().toISOString();
      const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      const parameters =
        filters + "ts=" + timestamp + "&apikey=" + PUBLIC_KEY + "&hash=" + hash;

      const response = await fetch(`${BASE_URL}${endpoint}${parameters}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API GET request failed: ", error);
      throw error;
    }
  },
};

export default marvelService;
