// @ts-nocheck

const API_URL = 'http://localhost:8100'



export async function updatePassword(data) {

    try{

         const res = await fetch(`${API_URL}/updatePassword/${data.id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)

            })

            const dataResponse = await res.json()

            console.log("this is data from updatePasswo:",dataResponse);

    } catch (error) {
      
        console.log("Error from update Password: ", error);
    }
  

}