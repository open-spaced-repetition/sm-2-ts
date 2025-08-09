import { Card, ReviewLog, Scheduler } from "../src";

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
            1,
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

    // the github action runner is slightly slower than my local machine
    // so causes a rounding error in the milisecond range
    expect((
    JSON.stringify(ivlHistory) == JSON.stringify([
      1, 0, 0, 6, 15,  0,
      0, 0, 0, 0, 35, 86,
      0
    ]) || 
    JSON.stringify(ivlHistory) == JSON.stringify([
      1, 0, 0, 6, 15,  0,
      0, 0, 0, 0, 35, 85,
      0
    ]))
).toBe(true);

});

test('test card serialize', () => {

  const card = new Card();

  let json = JSON.stringify(card);
  let parsedJson = JSON.parse(json);
  const copiedCard = Card.fromJSON(parsedJson);

  expect(card.equals(copiedCard)).toBe(true);

  // (x2) perform the above tests once more with a reviewed card
  const result = Scheduler.reviewCard(card,5);
  const reviewedCard = result.card;

  json = JSON.stringify(reviewedCard);
  parsedJson = JSON.parse(json);
  const copiedReviewedCard = Card.fromJSON(parsedJson);

  expect(reviewedCard.equals(copiedReviewedCard)).toBe(true);
  expect(card.equals(reviewedCard)).toBe(false);

});

test('test ReviewLog serialize', () => {

  let card = new Card();

  let result = Scheduler.reviewCard(card, 0);
  card = result.card;
  const reviewLog = result.reviewLog;

  let json = JSON.stringify(reviewLog);
  let parsedJson = JSON.parse(json);
  const copiedReviewLog = ReviewLog.fromJSON(parsedJson);
  expect(reviewLog.equals(copiedReviewLog)).toBe(true);

  // (x2) perform the above tests once more with a ReviewLog from a reviewed card
  result = Scheduler.reviewCard(card, 5);
  const nextReviewLog = result.reviewLog;

  json = JSON.stringify(nextReviewLog);
  parsedJson = JSON.parse(json);
  const copiedNextReviewLog = ReviewLog.fromJSON(parsedJson);
  expect(nextReviewLog.equals(copiedNextReviewLog)).toBe(true);

});