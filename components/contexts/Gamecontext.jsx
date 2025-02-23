"use client";

import { returnSuffledArr } from "@/utils/createArr";

const { createContext, useContext, useReducer, useEffect } = require("react");

const numData=[]


// const decks = [
//   { id: 0, character: 1, uniqueId: 0, isFlipped: false, isMatched: false },
//   { id: 1, character: 1, uniqueId: 0, isFlipped: false, isMatched: false },
//   { id: 2, character: 2, uniqueId: 1, isFlipped: false, isMatched: false },
//   { id: 3, character: 2, uniqueId: 1, isFlipped: false, isMatched: false },
//   { id: 4, character: 3, uniqueId: 2, isFlipped: false, isMatched: false },
//   { id: 5, character: 3, uniqueId: 2, isFlipped: false, isMatched: false },
//   { id: 6, character: 4, uniqueId: 3, isFlipped: false, isMatched: false },
//   { id: 7, character: 4, uniqueId: 3, isFlipped: false, isMatched: false },
//   { id: 8, character: 5, uniqueId: 4, isFlipped: false, isMatched: false },
//   { id: 9, character: 5, uniqueId: 4, isFlipped: false, isMatched: false },
//   { id: 10, character: 6, uniqueId: 5, isFlipped: false, isMatched: false },
//   { id: 11, character: 6, uniqueId: 5, isFlipped: false, isMatched: false },
//   { id: 12, character: 7, uniqueId: 6, isFlipped: false, isMatched: false },
//   { id: 13, character: 7, uniqueId: 6, isFlipped: false, isMatched: false },
//   { id: 14, character: 8, uniqueId: 7, isFlipped: false, isMatched: false },
//   { id: 15, character: 8, uniqueId: 7, isFlipped: false, isMatched: false },
// ];

 
const GameContext= createContext()

// const SecPerGame=10*decks.length

const initialState={
  gameSettings:{
    gridSize:4,
    character:"num",
    playersNum:1,
  },
    gameData:[],
    uniqueCard:[],
    players: [{players: 1, score: 0}],
    playIndex:0,
    moves:0,
    secRemaining:0,
    status:"play"
}



console.log(returnSuffledArr(8,"num"));


function GameProvider({children}){  
  function reducer(curState,action){
    // the action is with the dispatch function
  switch (action.type) {
    case "play":
      return {...curState,status:"play",moves:0}
    case "ready":
      const numberOfPairs = (curState.gameSettings.gridSize ** 2) / 2;
      const character=curState.gameSettings.character
      const newDeck = returnSuffledArr(numberOfPairs,character);
      // console.log(newDeck);
      
      return {...curState,status:"ready",gameData:newDeck, secRemaining:5*newDeck.length, players:Array.from({length:curState.gameSettings.playersNum},(_,index)=>({players:index+1,score:0}))}
    case "finished":      
      return {...curState,status:"finished"}
    case "gameSetting":
      return {...curState,gameSettings:{...curState.gameSettings,...action.payload}}
    case "flipped":
      return {...curState,gameData:curState.gameData.map((flip)=>flip.id===action.payload?{...flip,isFlipped:!flip.isFlipped}:flip),
      moves:curState.moves+1  
    }
    case "matched":
      return {...curState,gameData:curState.gameData.map((card)=>
          card.id===action.payload.first || card.id===action.payload.second ? {...card,isFlipped:true,isMatched:!card.isMatched}
          :card),
          players:curState.players.map((player,i)=> i===curState.playIndex?{...player,score:player.score+2}:player ),
        }
    case "noMatched":
      return {...curState,gameData:curState.gameData.map((card)=>
          card.id===action.payload.first || card.id===action.payload.second ? { ...card, isFlipped: false, isMatched: false }
          :card),
          playIndex: curState.playIndex>=curState.players.length-1? 0:curState.playIndex+1
          // playIndex: curState.playIndex<curState.players.length? curState.playIndex+1:0
        }
    case "selectedCard":
      if(curState.uniqueCard>=2){
        return curState
      }
      return {...curState,uniqueCard:[...curState.uniqueCard,{uid: action.payload.uid, id:action.payload.id}]}
    case "playersIndex":
      return {...curState,playIndex:action.payload}
    case "tick":
      // console.log(curState.secRemaining);
      return {...curState,secRemaining:curState.secRemaining-1,status:curState.secRemaining-1===0 ?"timeup":curState.status }
    case "resetCard":
      return {...curState,uniqueCard:[]}
    case "reset":
      
      const resetNumberOfPairs = (curState.gameSettings.gridSize ** 2) / 2;
      const restCharacter=curState.gameSettings.character
      const resetDeck = returnSuffledArr(resetNumberOfPairs,restCharacter);
     
      return {...curState,gameData:resetDeck,players:curState.players.map((play,i)=>({players:i+1, score: 0})),
      playIndex:0,moves:0,secRemaining:5*curState.gameData.length,status:"ready"
    }
    default:
      throw new Error("something went wrong")
    }
    
  }

  
  const [state,dispatch]=useReducer(reducer,initialState);
  const {gameData,uniqueCard,gameSettings,status,players,playIndex,secRemaining,moves}=state

  //! del


  const totalScore=players.reduce((acc,cur)=>{
      return acc+cur.score
  },0)
  console.log(totalScore);
  useEffect(function(){
    if(gameData.length===0)return
    if(totalScore===gameData.length){
      dispatch({type:"finished"})
    }
  },[totalScore])



  return <GameContext.Provider value={{gameData,dispatch,uniqueCard,gameSettings,status,players,playIndex,secRemaining,moves}}>
      {children} 
  </GameContext.Provider>

}

function useGame(){
  const context=useContext(GameContext)
  if(context===undefined)throw new Error("postContext was used outside of postPorvider")
    return context
}

export { GameProvider, useGame };













