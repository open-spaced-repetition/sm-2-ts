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

    equals(other: ReviewLog): boolean {

        return this.cardId == other.cardId &&
               this.rating == other.rating &&
               this.reviewDatetime.getTime() == other.reviewDatetime.getTime() &&
               this.reviewDuration == other.reviewDuration;

    }

    clone(): ReviewLog {

        return new ReviewLog(
            this.cardId,
            this.rating,
            new Date(this.reviewDatetime),
            this.reviewDuration
        );

    }

    toJSON(): {
        cardId: number,
        rating: number,
        reviewDatetime: Date,
        reviewDuration: number | null
    } {

        return {

            cardId: this.cardId,
            rating: this.rating,
            reviewDatetime: this.reviewDatetime.toISOString(),
            reviewDuration: this.reviewDuration

        };

    }

    static fromJSON(json: {
        cardId: number,
        rating: number,
        reviewDatetime: Date,
        reviewDuration: number | null
    }): ReviewLog {

        return new ReviewLog(
            json.cardId,
            json.rating,
            json.reviewDatetime,
            json.reviewDuration
        );

    }

}