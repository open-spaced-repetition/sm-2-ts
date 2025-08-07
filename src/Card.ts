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


}