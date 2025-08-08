import { Card, Scheduler } from "../src";

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
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    expect(Math.ceil(timeDelta / MS_PER_DAY)).toEqual(1);

});