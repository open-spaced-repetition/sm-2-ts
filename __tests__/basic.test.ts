import { Card, Scheduler } from "../src";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

test('should create a card with default values', () => {

    const card = new Card();

    expect(typeof card.cardId).toBe('number');
    expect(card.n).toBe(0);
    expect(card.EF).toBe(2.5);
    expect(card.I).toBe(0);
    expect(card.due instanceof Date).toBe(true);
    expect(card.needsExtraReview).toBe(false);

});

test('test quickstart', () => {

    let card = new Card();

    // card is due immediately upon creation
    expect(new Date() >= card.due).toBe(true);

    let rating = 5;

    let result = Scheduler.reviewCard(card, 5, card.due); 
    card = result.card;
    let reviewLog = result.reviewLog;

    let due = card.due;

    // how much time between when the card is due and now
    let timeDelta = due.getTime() - (Date.now());

    // card is due in 1 day
    expect(Math.ceil(timeDelta / MS_PER_DAY)).toEqual(1);

});

test('test intervals', () => {

    let card = new Card();
    let now = new Date();

    let ratings = [
            4,
            3,
            3,
            4,
            5,
            3,
            0,
            5,
            3,
            3,
            4,
            5,
            3,
    ];

    let ivlHistory: number[] = [];
    for (let rating of ratings) {

        let result = Scheduler.reviewCard(card, rating, now);
        card = result.card;
        let ivl = Math.ceil((card.due.getTime() - now.getTime()) / MS_PER_DAY);
        ivlHistory.push(ivl);
        now = card.due;

    }

    expect(ivlHistory).toEqual([
      1, 0, 0, 6, 15,  0,
      0, 0, 0, 0, 35, 86,
      0
    ]);

});