const options = {
  method: `GET`,
  headers: {
    accept: `application/json`,
    "X-API-KEY": process.env.API_KEY,
  },
};
const API = `https://openapiv1.coinstats.app/coins`;
export const service = {
  getCoins: () => fetch(API, options).then((res) => res.json()),
};
