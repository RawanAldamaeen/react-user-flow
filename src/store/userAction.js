import axios from "axios";
import Types from "./types";

export const userLogin = (user) => {
  console.log(user.email);
  return async (dispatch) => {
    const query = { email: user.email, password: user.password, client_id: '2', client_secret: 'fhMZQxfVREJrII50IeN4ThIZCerdOFjxiRGu7Lc0'}
    const headers= {
      'accept-language': 'en',
      'x-api-key': 'boilerplate_react',
      'Authorization':
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiN2I5YjdlZWUzZDczOGUwODg4Y2RkZTM0YTZlNzE3OGRlZDMzYTYwMTFjMDdiNTkwMzY3YTk2ODA1Y2YwMTU4ZDUwZDNmMGNiZDRkZGQ5YzciLCJpYXQiOjE2MDkwNjk0NzMsIm5iZiI6MTYwOTA2OTQ3MywiZXhwIjoxNjQwNjA1NDczLCJzdWIiOiIyNCIsInNjb3BlcyI6WyIqIl19.nNJyWcOs_ahAXWNlZbssfeGTxjshoawMCMRcNysFbmjdvX-aaXsRpXkLNHRWpxA4GmGH-HBsweUAq2DX7KuC1qR_QqJ-pBWEOX2bhI5KId068FlZQH5m6IsGe1pyKt6Ic479xz9LMwitH_uCTukSAH77lJucuEE5eOBLeyniimWqop17_Gp-FnpRwjmx1EZpcTAT4mkVKB2ZMQdO-RODMxIxWPbTt81EUajkrFfOETXdm478s0eQzpOhoCycXeySOIXFm3nm35UPJbkzu-PlPZob--QdH2jcT2-7xXSSlUUm6vLG8T9kYkcDYewqHj67tr21rSbtFYol3IPE8Vn8eTRfhQb1nMwuUUOeFzdRQrxNKrwuXqzDVr4oCk6hsZ0r6tH8zokM3RzhUJWgPuU6_YgUWi1s1GKMCNd74qFrMXQRF7awdT9RGdkecA84lGrkSPZstEpLzxWhD5mTosBIDHS1fqNpcqUoBc_MRcXXxTugzav2cJT-UhfuZqDbo5XEKstHYabaMYdGSNSP73eMeaV0ghqB1uD082PuQ5ymYnGx2vfU4KoOLQwDmJO4fDTYzXksJdmxfsSW_E3Ohg7kVET61BhQCMSLxS82NSnr7dk2Z-_BqcRuMIgS2XHUYMvL1WU4GBACtqnlPkS6p6jQnPGbJGlGmStulTT3G-4s4aI'
    }
    const request = await axios.post('https://boiler-stage.ibtikar.sa/api/v1/users/login', query, {headers})
    .then(response => {return dispatch({
      type: Types.LOGIN,
      logged: true,
      email: response.data.data.user.email
    })})
    .catch(error => {return dispatch({
      type: Types.AUTH_FAILED,
      logged: false,
      err_msg: "Your Email or Password is uncorrect"
      
    })})
  };
};
