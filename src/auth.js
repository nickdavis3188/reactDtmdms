/* eslint-disable prettier/prettier */
class Auth {
    constructor() {
        this.authenticated = false
    }

    login(){
        this.authenticated = true
    }

    logOut(){
        this.authenticated = false
    }

    isAuthenticated(){
        return this.authenticated
    }
}

export default new Auth();