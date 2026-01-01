import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";
import { deal } from "../src/deal";

describe("deal", () => {
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

  it('deals the correct number of hands', () => {
    const cards = createCards({suits, values});
    const hands = deal(cards, 5, 4);
    expect(hands.length).toBe(4);
  })

  it('deals each hand the correct number of cards', () => {
    const cards = createCards({suits, values});
    const hands = deal(cards, 5, 4);
    expect(hands[0].length).toBe(5);
    expect(hands[1].length).toBe(5);
    expect(hands[2].length).toBe(5);
    expect(hands[3].length).toBe(5);
  })
});
