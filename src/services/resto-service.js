export default class RestoService {
    _apiBase = 'http://localhost:3001/';

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
}