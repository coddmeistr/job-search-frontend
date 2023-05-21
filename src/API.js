import axios from "axios";

axios.defaults.withCredentials = true
// main url https://startup-summer-2023-proxy.onrender.com/
// sec proxy http://startup-summer-proxy-production.up.railway.app/
const instance = axios.create({
    withCredentials: false,
    baseURL: "https://startup-summer-2023-proxy.onrender.com/",
    headers: {
        "x-secret-key": process.env.REACT_APP_API_SECRET_KEY,
        "X-Api-App-Id": process.env.REACT_APP_SECRET_KEY,
    }
})

export const userAPI = {

    fetchVacanciesById: (ids, page, itemsOnPage) => {
        const token = JSON.parse(localStorage.getItem("token"))

        let idsStr = "ids[]=&"
        ids.map(id => {
            idsStr += `ids[]=${id}&`
            return 0
        })
        return instance.get(`2.0/vacancies/?${idsStr}page=${page-1}&count=${itemsOnPage}`,
        {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
    },

    fetchVacancies: (keyword, from, to, catalogue, page, itemsOnPage) => {
        const token = JSON.parse(localStorage.getItem("token"))

        let from2 = `&payment_from=${from}`
        let to2 = `&payment_to=${to}`
        let catalogue2 = `&catalogues=${catalogue}`
        if (from === null || from <= 0) from2 = ""
        if (to === null || to <= 0) to2 = ""
        if (catalogue === null) catalogue2 = ""
        return instance.get(`2.0/vacancies/?published=1&keyword=${keyword}${from2}${to2}${catalogue2}&page=${page-1}&count=${itemsOnPage}`, {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
    },

    fetchVacancy: (id) => {
        const token = JSON.parse(localStorage.getItem("token"))

        return instance.get(`2.0/vacancies/${id}/`, {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
    },

    fetchCatalogues: () => {
        const token = JSON.parse(localStorage.getItem("token"))

        return instance.get(`2.0/catalogues/`, {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
    }

}

export const authAPI = {
    

    login: () => {
        return instance.get(`2.0/oauth2/password?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0`)
    },

    refreshToken: (token) => {
        return instance.get(`2.0/oauth2/refresh_token/?refresh_token=${token}&client_id=${process.env.REACT_APP_API_APP_ID}&client_secret=${process.env.REACT_APP_SECRET_KEY}`)
    }

}
