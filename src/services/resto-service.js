export default class RestoService {
    url = 'https://www.anapioficeandfire.com/api/';

     getMenuItems = async () => {
        const res = await fetch(this.url);
            if (!res.ok){
            throw new Error(`Could not fetch , status: ${res.status}`)
            }
        return await res.json();
    }
}