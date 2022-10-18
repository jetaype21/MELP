import { MelpApi } from "../api/MelpApi";

export const FetchAllData = async () => {
    
    const resp = await MelpApi.get('/data.json');
    const listAllRestaurants = resp.data

    return  listAllRestaurants
}