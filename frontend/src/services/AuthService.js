import $api from "@/http";

export default class AuthService {
    static async signup(signupData) {
        return $api.post('auth/signup', signupData);
    }

    static async signin(email, password) {
        return $api.post('auth/signin', {
            email: email,
            password: password
        });
    }

    static async signout() {
        return $api.post('auth/signout');
    }
}