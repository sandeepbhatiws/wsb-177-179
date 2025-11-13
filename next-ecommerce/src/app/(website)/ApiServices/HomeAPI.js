import axios from "axios"

const productAPI = async () => {
    return await axios.get('https://wscubetech.co/ecommerce-api/products.php', {
        params : {
            limit : 8
        }
    })
    .then((result) => {
        return result.data.data;
    })
}

const categories = async () => {
    return await axios.get('https://wscubetech.co/ecommerce-api/products.php', {
        params : {
            limit : 8
        }
    })
    .then((result) => {
        return result.data.data;
    })
}

export { productAPI, categories }