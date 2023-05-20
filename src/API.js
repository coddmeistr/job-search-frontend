import axios from "axios";

axios.defaults.withCredentials = true

const instance = axios.create({
    withCredentials: false,
    baseURL: "https://startup-summer-2023-proxy.onrender.com/",
    headers: {
        "x-secret-key": "GEU4nvd3rej*jeh.eqp",
        "X-Api-App-Id": "v3.r.137558760.35c8c91301d7c09de6c85b254a4b21facaf9c1b9.b63650643d1a8a43609be5548ef8e41688ee42cf",
    }
})


export const userAPI = {

    fetchVacanciesById: (ids, page) => {
        const token = JSON.parse(localStorage.getItem("token"))

        let idsStr = "ids[]=&"
        ids.map(id => {
            idsStr += `ids[]=${id}&`
            return 0
        })
        return instance.get(`2.0/vacancies/?${idsStr}page=${page}&count=5`, {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
    },

    fetchVacancies: (keyword, from, to, catalogue, page) => {
        const token = JSON.parse(localStorage.getItem("token"))

        let from2 = `&payment_from=${from}`
        let to2 = `&payment_to=${to}`
        let catalogue2 = `&catalogues=${catalogue}`
        if (from === null || from <= 0) from2 = ""
        if (to === null || to <= 0) to2 = ""
        if (catalogue === null) catalogue2 = ""
        return instance.get(`2.0/vacancies/?published=1&keyword=${keyword}${from2}${to2}${catalogue2}&page=${page}&count=10`, {headers: {...instance.headers, "Authorization": `${token.token_type} ${token.access_token}`}})
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

}
