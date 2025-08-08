export class ReviewLog {

    cardId: number;
    rating: number;
    reviewDatetime: Date;
    reviewDuration: number | null;

    constructor(cardId: number, rating: number, reviewDatetime: Date, reviewDuration: number | null = null) {

        this.cardId = cardId;
        this.rating = rating;
        this.reviewDatetime = reviewDatetime;
        this.reviewDuration = reviewDuration;

    }

}