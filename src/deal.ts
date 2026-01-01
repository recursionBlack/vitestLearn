interface Card { suit: string; value: string }

// 发牌函数
export function deal(cards:{suit:string, value: string}[], handsize:number, numberOfPlayer:number){
    const hands:Card[][] = Array.from({length: numberOfPlayer}, () => []);

    for(let i=0; i<handsize; i++){
        for(let playIndex = 0; playIndex < numberOfPlayer; playIndex++){
            if(cards.length === 0){
                throw new Error('Not enough cards to deal');
            }
            hands[playIndex].push(cards.shift() as Card);
        }
    }

    return hands;
}