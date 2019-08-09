
const apiVersion = '/api/v1';
const HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'}
/*************************************  API METHODS   *******************************************/

export const API_METHODS = {
  getPosts:"/post/getPosts",
  addPost:"/post/create",
  getLastActive:"/user/getLastActive"
}

export function getPosts(){
  return fetch (apiVersion + API_METHODS.getPosts, {headers: HEADERS})
   .then(unpackResponse);
}

export function addPost(formData){
  return fetch ( apiVersion + API_METHODS.addPost, {
    headers: HEADERS,
    body:JSON.stringify(formData),
    method: 'POST'
   })
   .then(unpackResponse);
}

export function getLastActive(email){
  return fetch ( apiVersion + API_METHODS.getLastActive, {
    headers: HEADERS,
    body:JSON.stringify({email:email}),
    method: 'POST'
   })
   .then(unpackResponse);
}

function unpackResponse(response){
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    }
    return data;
  })
}

class dataService {}
export default dataService;

