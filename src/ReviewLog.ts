export class ReviewLog {

    cardId: number;
    rating: number;
    reviewDatetime: Date;
    reviewDuration: number;

    constructor(cardId: number, rating: number, reviewDatetime: Date, reviewDuration: number) {

        this.cardId = cardId;
        this.rating = rating;
        this.reviewDatetime = reviewDatetime;
        this.reviewDuration = reviewDuration;

    }

}