const axios = require('axios');
const querystring = require('querystring');

const access_token = "ggt";
const NETFLIX_DOMAIN = "https://www.netflix.com/";
const url = "http://65.21.228.155:3000/access";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
};
const data = {
  access_token: access_token,
  profile_id: "100004323155386"
};

async function shortenLink(longUrl) {
    try {
      const response = await axios.get(`http://tinyurl.com/api-create.php?url=${longUrl}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

async function main() {
    try {
      const response = await axios.post(url, querystring.stringify(data), { headers });
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        const nftoken = data.data.NFToken;
        const link = NETFLIX_DOMAIN + '?nftoken=' + nftoken;
        console.log(await shortenLink(link));
      } else {
        console.log("Error:", response.status);
      }
   
