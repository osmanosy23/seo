import axios from 'axios';
import apikey from './apikey';

const accessKey = apikey;
const apiUrl = 'https://api.unsplash.com/photos/random';
// const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

console.log(accessKey)
console.log("hey")
const getUnsplashImages = async () => { // Make sure it is named getUnsplashImages, not getUnsplashImage
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      params: {
        count: 10, // Number of random images to fetch
      },
    });
    return response.data; // Array of random images
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
};



export default getUnsplashImages;
