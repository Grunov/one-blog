module.exports = class UserDto {
    id
    name  
    email
    roles
    isActivated

    constructor(model) {
        this.id          = model._id
        this.name        = model.name
        this.email       = model.email
        this.isActivated = model.isActivated
        this.roles       = model.roles
    }
}