export class Card {

    cardId: number;
    n: number;
    EF: number;
    I: number;
    due: Date;
    needsExtraReview: boolean;

    constructor(
        cardId: number | null = null, 
        n: number = 0,
        EF: number = 2.5,
        I: number = 0,
        due: Date | null = null,
        needsExtraReview: boolean = false) {

        if (cardId == null) {
            // epoch miliseconds of when the card was created
            cardId = Date.now();
        }
        this.cardId = cardId;

        this.n = n;
        this.EF = EF;
        this.I = I;

        if (due == null) {
            due = new Date();
        }
        this.due = due;

        this.needsExtraReview = needsExtraReview;

    }

    equals(other: Card): boolean {

        return this.cardId == other.cardId &&
               this.n == other.n &&
               this.EF == other.EF &&
               this.I == other.I &&
               this.due.getTime() == other.due.getTime() &&
               this.needsExtraReview == other.needsExtraReview;

    }

    clone(): Card {

        return new Card(
            this.cardId,
            this.n,
            this.EF,
            this.I,
            new Date(this.due),
            this.needsExtraReview
        );

    }

    toJSON(): {
        cardId: number,
        n: number,
        EF: number,
        I: number,
        due: string,
        needsExtraReview: boolean
    } {

        return {

            cardId: this.cardId,
            n: this.n,
            EF: this.EF,
            I: this.I,
            due: this.due.toISOString(),
            needsExtraReview: this.needsExtraReview

        };

    }

    static fromJSON(json: {
        cardId: number,
        n: number,
        EF: number,
        I: number,
        due: string,
        needsExtraReview: boolean
    }): Card {

        return new Card(
            json.cardId,
            json.n,
            json.EF,
            json.I,
            new Date(json.due),
            json.needsExtraReview
        );

    }    


}