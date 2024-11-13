import { BACKEND_DOMAIN } from "@/config";

export const SearchAllMangas = async (manganame) => {
    try {
        const response = await fetch(`${BACKEND_DOMAIN}/api/search-mangas?manganame=${encodeURIComponent(manganame)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}