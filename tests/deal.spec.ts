import { describe, it, expect, vi ,Mock} from "vitest";
import { createCards } from "../src/createCards";
import { deal } from "../src/deal";

// mock 整个模块，为空函数,即全都替换成vi.fn()
// vi.mock('../src/helpers/loggers')

// mock 整个模块，并指定替换的函数
vi.mock("../src/helpers/loggers", async () => {
  // 如果模块中导出了很多的函数，而我们想让别的函数，仍然用原来正确的，则可以使用该语句
  const origanals = await vi.importActual('../src/helpers/loggers');

  return {
    ...origanals,   // 原来正确的
    // 唯一被我们mock的，
    logDealRound: vi.fn(() => {
      console.log("logDealRound mock fn called");
      return true;
    }),
  };
});

import { logDealRound } from "../src/helpers/loggers";

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

  it("deals the correct number of hands", () => {
    const cards = createCards({ suits, values });
    const hands = deal(cards, 5, 4);
    expect(hands.length).toBe(4);
  });

  it("deals each hand the correct number of cards", () => {
    const cards = createCards({ suits, values });
    const hands = deal(cards, 5, 4);
    expect(hands[0].length).toBe(5);
    expect(hands[1].length).toBe(5);
    expect(hands[2].length).toBe(5);
    expect(hands[3].length).toBe(5);
  });

  it('calls the logger a correct number of times ', () => {
    const cards = createCards({suits, values});

    // mock.clear,清除掉之前的测试用例调用的计数器，防止干扰本次调用
    (logDealRound as Mock).mockClear();
    deal(cards, 5, 3);

    expect(logDealRound).toBeCalledTimes(5);
    expect(logDealRound).toHaveReturnedWith(true);
  })
});
