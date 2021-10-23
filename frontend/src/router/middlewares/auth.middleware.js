import {
    GET_AUTH_STATE
} from '@/store/constants'

export default function auth ({ next, store }) {
    const authState = store.getters[`auth/${GET_AUTH_STATE}`]
    if(!authState){
        return next({
            name: 'home',
        })
    }
    return next()
}