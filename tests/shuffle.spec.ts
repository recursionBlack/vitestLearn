import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";
import { shuffle } from "../src/shuffle";

describe("shuffle", () => {
  const suits = ["Hearts", "Diamondes", "Clubs", "Spades"];
  const values = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "Queen",
    "King",
  ];

  it('randomizes the order of an array of cards', () => {
    const cards = createCards({suits, values});
    const shuffled = shuffle(cards);

    // 检查相同位置上的卡牌, 如果在某个位置上，新旧牌组一样，则将其加入到samePositions里
    // 最后检测samePositions的大小是否还是52
    const samePositions = shuffled.filter((card,i) => {
        return card === cards[i];
    })

    expect(samePositions.length).toBeLessThan(cards.length);
  })

  it('not change the length of the array', () => {
    const cards = createCards({suits, values});
    const shuffled = shuffle(cards);
    expect(shuffled).toHaveLength(cards.length);
  })
});
