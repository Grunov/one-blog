module.exports = class CurrencyDto {
    id
    authorId
    authorName
    text
    date

    constructor(model) {
        this.id      = model._id;
        this.authorId  = model.authorId
        this.authorName  = model.authorName
        this.text    = model.text
        this.date    = model.date
    }
}