import { shuffle } from "./shuffle";
import { deal } from "./deal";

interface Card { suit: string; value: string }

export function setupGame(cards:Card[], handsize:number, numberOfPlayer:number){
    const shuffledCards = shuffle(cards);

    const hands = deal(shuffledCards, handsize, numberOfPlayer);

    const players = hands.map((hand, index:number)=>({
        id: index + 1,
        hand:hand,
        currentTurn: index === 0

    }))

    return players;
}