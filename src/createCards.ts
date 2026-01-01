export function createCards({ suits, values }:{suits:string[], values:string[]}){
    if(!Array.isArray(suits) || !Array.isArray(values))
    {
        throw new TypeError('suits and values must be arrays');
    }
    if(suits.length !== 4 || values.length !== 13 ){
        throw new RangeError('suits and values must be standard length (4 and 13)');
    }
    if(new Set(suits).size !== suits.length){
        throw new Error('suits array contains duplicate');
    }
    if(new Set(values).size !== values.length){
        throw new Error('values array contains duplicate');
    }

    const cards:{suit:string, value:string}[] = []; 
    for(let suit of suits){
        for(let value of values)
        {
            cards.push({suit, value});
        }
    }
    return cards;
}