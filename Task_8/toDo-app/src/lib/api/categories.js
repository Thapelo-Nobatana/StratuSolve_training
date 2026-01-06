
// @ts-nocheck
const API_URL = 'http://localhost:8100';

import { userValues } from "$lib/stores/auth.svelte";

export async function fetchCategories() {
    try{
    
        let res = await fetch(`${API_URL}/categories`, {
            headers: { 'Content-Type': 'application/json' , 'Authorization':userValues.userId},

        })
        
        let data = await res.json()
        console.log("all fetched categories:    ",data)
        return data ;
    }
    catch{
        console.log("something went wrong")
        return {err: "something went wrong"}

    }
}


export async function createCategory(data) {
    try{
        
        let res = await fetch(`${API_URL}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization':userValues.userId},
            body: JSON.stringify(data)
        })
        return await res.json()
    }
    catch{
        return {err: "something went wrong"}
    }
}
export async function deleteCategory(id) {
    try{
        
        let res = await fetch(`${API_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' , 'Authorization':userValues.userId},
        })
        return await res.json()
    }
    catch{
        return {err: "something went wrong"}
    }
}