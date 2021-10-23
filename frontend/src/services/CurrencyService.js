import $api from "@/http";

export default class CurrencyService {
    static fetchCurrencies() {
        return $api.get('/currency');
    }
    static fetchCurrency(id) {
        return $api.get(`/currency/${id}`);
    }
    static createCurrency(name, ticker) {
        return $api.post('/currency/create', {
            name: name,
            ticker: ticker
        })
    }
    static updateCurrency(currency) {
        return $api.patch('/currency/update', currency)
    }
    static deleteCurrency(id) {
        return $api.delete('/currency/delete', {
            data: {
                id: id
            }
            
        })
    } 
}