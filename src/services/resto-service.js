export default class RestoService {
    _apiBase = 'https://my-json-server.typicode.com/dznchkone/react-resto-app/';

     getMenuItems = async () => {
         let answer;
         try {
             const res = await fetch(`${this._apiBase}menu/`);
             if (!res.ok){
                 throw new Error(`Could not fetch , status: ${res.status}`);
             }
             answer = await res.json();
         } catch (e) {
             throw new Error(e);
         }
         return answer
    }

    postOrder = async (data) => {
         const id = Date.now().toString();
         const order = {
             id,
             data
         }
         let answer;
         if (data.length === 0) return null;
         try {
             const res = await fetch(`${this._apiBase}orders/`,{
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json;charset=utf-8'
                 },
                 body: JSON.stringify(order)
             });
             answer = await res.json();
         } catch (e) {
             throw new Error(e);
         }
         return  answer;
    }
}