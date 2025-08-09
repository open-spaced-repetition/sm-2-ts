import { Card } from "./Card";
import { ReviewLog } from "./ReviewLog";

export class Scheduler {

    static reviewCard(
        card: Card, 
        rating: number, 
        reviewDatetime: Date | null = null, 
        reviewDuration: number | null = null):  {card: Card, reviewLog: ReviewLog} {

        card = card.clone();

        if (reviewDatetime == null) {
            reviewDatetime = new Date();
        }

        let cardIsDue: boolean = reviewDatetime >= card.due; 

        if (!cardIsDue) {
            throw new Error(`Card is not due for review until ${card.due}`);
        }

        if (card.needsExtraReview) {

            if (rating >= 4) {
                card.needsExtraReview = false;
                card.due.setDate(card.due.getDate() + card.I);
            }


        } else {


            if (rating >= 3) { // correct response
                // note: EF increases when rating = 5, stays the same when rating = 4 and decreases when rating = 3
                card.EF = card.EF + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
                card.EF = Math.max(1.3, card.EF);

                if (card.n == 0) {
                    card.I = 1;

                } else if (card.n == 1) {
                    card.I = 6;

                } else {
                    card.I = Math.ceil(card.I * card.EF);

                }

                card.n += 1;

                if (rating >= 4) {
                    card.due.setDate(card.due.getDate() + card.I);

                } else {
                    card.needsExtraReview = true;
                    card.due = reviewDatetime;

                }

            } else { // incorrect response
                card.n = 0;
                card.I = 0;
                card.due = reviewDatetime;
                // EF doesn't change on incorrect responses

            }

        }

        const reviewLog = new ReviewLog(card.cardId, rating, reviewDatetime, reviewDuration);

        return {card, reviewLog};

    }

}