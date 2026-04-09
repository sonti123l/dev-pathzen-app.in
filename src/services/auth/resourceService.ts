import { $fetch } from "~/http/fetch";

export const getColleges = async() => {
    try{
        const response = await $fetch.get("/api/colleges");
        return response
    }catch(err){
        throw err;
    }
}