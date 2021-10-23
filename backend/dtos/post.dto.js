module.exports = class CurrencyDto {
    id
    authorId
    authorName
    title
    image
    text
    date

    constructor(model) {
        this.id      = model._id;
        this.authorId  = model.authorId
        this.authorName  = model.authorName
        this.title  = model.title
        this.image  = model.image
        this.text    = model.text
        this.date    = model.date
    }
}