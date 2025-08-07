import { Card } from "../src";

test('should create a card with default values', () => {

    const card = new Card();

    expect(typeof card.cardId).toBe('number');
    expect(card.n).toBe(0);
    expect(card.EF).toBe(2.5);
    expect(card.I).toBe(0);
    expect(card.due instanceof Date).toBe(true);
    expect(card.needsExtraReview).toBe(false);

});
