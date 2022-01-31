var request = require('request')

const searchProduct = (product) => {
    request({
        method: 'GET',
        url: `https://api.mercadolibre.com/sites/MLB/search?q=${product}`,
        headers: {
        'Content-Type': 'application/json'
        }}, function (error, response, body) {
            return urlDivider(body)
    });
}

// Função para colocar todos Ids dos produtos dentro de um ARRAY
const urlDivider = (data) => {
    const listUrl = []
    const parsedData = JSON.parse(data)
    for(const URL of parsedData.results){
        const URL_LIST = [URL.id]
        listUrl.push(URL_LIST)
    }
    console.log('Procurando URLs')
    console.log(listUrl)
    return urlAccess(listUrl)
}

const urlAccess = (data) => {
    console.log('Acessando URLs')
    console.log('Pegando comentários')
    for(const dados of data){
        request({
            method: 'GET',
            url: `https://api.mercadolibre.com/reviews/item/${dados}`,
            headers: {
            'Content-Type': 'application/json'
            }}, function (error, response, body) {
                if(JSON.parse(body)['paging']['total'] != 0){
                    return productObj(body)
                }
        });
    };
}

const productObj = (data) => {
    const listObj = []
    const parsedData = JSON.parse(data)
    for(const review of parsedData.reviews){
        const ITEM_LIST = {
            comment: review.content
        }
        if(review.content != null){
            listObj.push(ITEM_LIST)
        }
    }
    return console.log(listObj)
}

searchProduct('samsung')

// BUSCA DE ITENS https://api.mercadolibre.com/sites/MLB/search?q=Motorola%20G6
// BUSCA REVIEWS https://api.mercadolibre.com/reviews/item/${ID_Produto}
