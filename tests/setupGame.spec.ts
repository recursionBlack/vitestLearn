import { describe, it, expect, vi, Mock } from "vitest";
import { createCards } from "../src/createCards";
import { setupGame } from "../src/setupGame";


// import module to spyon it
import * as shuffleModule from "../src/shuffle";
import * as dealModule from "../src/deal";

describe("setupGame", () => {
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

  it('calls shuffle before dealing cards', () => {
    const cards = createCards({ suits, values });
    const shuffleSpy = vi.spyOn(shuffleModule, 'shuffle');
    const dealSpy = vi.spyOn(dealModule, 'deal');

    setupGame(cards, 5, 3);

    expect(shuffleSpy).toBeCalledTimes(1);
    // 获取该函数第一次被调用的全局顺序
    expect(shuffleSpy.mock.invocationCallOrder[0]).toBeLessThan(dealSpy.mock.invocationCallOrder[0]);
  })

  it('calls deal with correct argument', () => {
    const cards = createCards({ suits, values });
    const shuffleSpy = vi.spyOn(shuffleModule, 'shuffle');
    const dealSpy = vi.spyOn(dealModule, 'deal');

    setupGame(cards, 5, 3);

    // get the shuffled cards that shuffle returned
    const shuffledCards = shuffleSpy.mock.results[0].value

    expect(dealSpy).toHaveBeenCalledWith(shuffledCards, 5, 3);
  })
});
