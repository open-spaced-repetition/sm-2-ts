<div align="center">
  <img src="https://raw.githubusercontent.com/open-spaced-repetition/py-fsrs/main/osr_logo.png" height="100" alt="Open Spaced Repetition logo"/>
</div>
<div align="center">

# SM-2

</div>
<div align="center">
  <em>🧠🔄 The Classic SM-2 Spaced Repetition Algorithm in Typescript 🧠🔄</em>
</div>
<br />
<div align="center" style="text-decoration: none;">
    <a href="https://www.npmjs.com/package/@open-spaced-repetition/sm-2"><img src="https://img.shields.io/npm/v/@open-spaced-repetition/sm-2"></a>
    <a href="https://github.com/open-spaced-repetition/sm-2-ts/blob/main/LICENSE" style="text-decoration: none;"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"></a>
</div>
<br />

**Typescript package implementing the classic <a href="https://super-memory.com/english/ol/sm2.htm">SM-2</a> algorithm for spaced repetition scheduling.**

## Table of Contents
- [Installation](#installation)
- [Quickstart](#quickstart)
- [Versioning](#versioning)

## Installation

You can install the package using npm:

```bash
npm install @open-spaced-repetition/sm-2
```

## Quickstart

Import FSRS modules and create a new Card object
```ts
import { Scheduler, Card, ReviewLog } from "./src";

// NOTE: all new cards are 'due' immediately upon creation
let card = new Card();
```

Choose a rating and review the card with the scheduler

```ts
// 5 - perfect response
// 4 - correct response after a hesitation
// 3 - correct response recalled with serious difficulty
// 2 - incorrect response; where the correct one seemed easy to recall
// 1 - incorrect response; the correct one remembered
// 0 - complete blackout.

const rating = 5;

const result = Scheduler.reviewCard(card, rating);
card = result.card;
const reviewLog = result.reviewLog;

console.log(`Card rated ${reviewLog.rating} at ${reviewLog.reviewDatetime}`);
// > Card rated 5 at Sat Aug 09 2025 17:03:30 GMT-0700 (Pacific Daylight Time)
```

See when the card is due next

```ts
console.log(`Card due on ${card.due}`);
// > Card due on Sun Aug 10 2025 17:03:30 GMT-0700 (Pacific Daylight Time)

const MS_PER_HOUR = 1000 * 60 * 60;
const intervalLength = (card.due.getTime() - Date.now()) / MS_PER_HOUR;
console.log(`Card due in ${intervalLength} hours`);
// > Card due in 23.99999972222222 hours
```

## Versioning

This package is currently unstable and adheres to the following versioning scheme:

- **Minor** version will increase when a backward-incompatible change is introduced.
- **Patch** version will increase when a bug is fixed or a new feature is added.

Once this package is considered stable, the **Major** version will be bumped to 1.0.0 and will follow [semver](https://semver.org/).