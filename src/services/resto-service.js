export default class RestoService {
    async getMenuItems() {
        const res = await fetch(`https://www.anapioficeandfire.com/api/`);
            if (!res.ok){
            throw new Error(`Could not fetch , status: ${res.status}`)
            }
        return await res.json();
    }
}