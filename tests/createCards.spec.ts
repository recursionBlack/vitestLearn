import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";

describe("createCards", () => {
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

  it("return an array", () => {
    const cards = createCards({ suits, values });
    expect(Array.isArray(cards)).toBe(true);
  });

  it("create a deck of 52 cards", () => {
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
    const cards = createCards({ suits, values });
    expect(cards).toHaveLength(52);
  });

  it('throws an error if suits or values are not standard lengths',() => {
    // 如果要检测throw，expect里必须是函数对象，而不是函数的返回值，否则，函数执行了，throw了， 程序直接崩溃了，就走不到expect里了
    // 如果传递的是函数对象，expect可以对throw进行捕获，程序可以继续正常运行
    expect(() => createCards({suits: ['Hearts'], values})).toThrow(/4/);
    expect(() => createCards({suits, values: ['1', '2']})).toThrow(/13/);
  })

  it('throws an error if suits or values are not arrays', () => {
    expect(() => createCards({suits: 'not an array' as any, values})).toThrow();
    expect(() => createCards({suits, values: 'not an array' as any})).toThrow();
  })

  it('creates card objects with {suit, value} properties', () => {
    const cards = createCards({ suits, values });
    const sample = cards[0];
    expect(sample).toBeTypeOf('object');
    expect(sample).toHaveProperty('suit');
    expect(sample).toHaveProperty('value');
  })

  it('create combinations of suits and values', () => {
    const cards = createCards({ suits, values });
    const tenOfHearts = cards.find(c => c.value === '10' && c.suit === 'Hearts');
    expect(tenOfHearts).toBeDefined();

    const aceOfSpades = cards.find(c => c.value === 'Ace' && c.suit === 'Spades');
    expect(aceOfSpades).toBeDefined();
  })

  it('throw an error for duplicate suits or values', () => {
    expect(() => createCards({ suits:['Hearts', 'Diamonds', 'Clubs', 'Hearts'], values })).toThrow(/duplicate/);
    expect(() => createCards({ suits, values: [
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
      "Ace",
    ]})).toThrow(/duplicate/);

  })
});
