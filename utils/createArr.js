function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
export function returnSuffledArr(length,opp){
    const a=Array.from({length},(_,index)=>({
      id:index,
      character: opp==="num"? index+1:`icon${index+1}`,  
      uniqueId: index,        
      isFlipped: false,
      isMatched: false,
    }))
  
    const deck=[...a,...a].map((card,i)=>({...card,id:i}))
   return shuffle(deck)
  }