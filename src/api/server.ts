let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwMTk2MTczMiwianRpIjoiZDZiMjQxNzMtYTNjMC00NzM0LTk0OWEtYmJmZDdhYzU1YTU4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImJpa3JhbSIsIm5iZiI6MTcwMTk2MTczMiwiZXhwIjoxNzMzNDk3NzMyfQ.pGLsGnQaVdaf_85z7c5DF68d2zXUyxaK_sOjU-2ynts"
let userId = localStorage.getItem('uuid') //grabbing the uuid from Google Authentication



// putting all our API calls in a giant dictionary/object

export const serverCalls = {

    getShop: async () => {
        // api call consist of 1-4 things 
        // 1. url (required)
        // 2. methods (optional it will default to GET)
        // 3. headers (optional but usually there) authentication type & type of data 
        // 4. body (optional usually only on a POST, PUT and sometimes DELETE)
        const response = await fetch(`https://abodezen-shop.onrender.com/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status 
        }

        return await response.json()
    }
}