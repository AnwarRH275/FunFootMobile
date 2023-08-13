import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fun-foot.com/apiV2/'
});



// const instance = axios.create({
//   baseURL: 'https://3306-105-68-214-78.ngrok-free.app'
// });

export default instance;
 // npx expo start --dev-client
 // eas build --profile development --platform android --local

 
