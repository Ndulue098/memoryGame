"use client"

import { useEffect, useState } from "react";
import { useGame } from "./contexts/Gamecontext";
import Image from "next/image";

export default function Game() {
  const {uniqueCard,gameData,dispatch,gameSettings}=useGame()
  const {gridSize,character:settingCharacter}=gameSettings

  const [isProcessing,setIsProcessing]=useState(false)
  
  function handleClick(uid,id){
    if(isProcessing||uniqueCard.length>2)return;
    dispatch({type:"selectedCard",payload:{uid,id}});
    dispatch({ type: "flipped", payload: id });
  }

  useEffect(function(){
    let timer;
    
    if(uniqueCard.length===2){
      Mached()
    }

    function Mached(){
      setIsProcessing(true)
      const [start,end]=uniqueCard
      const {uid:fuid,id:fid} =start
      const {uid:suid,id:sid} =end
 
      if(fuid===suid){
        dispatch({type:"matched",payload:{first:fid,second:sid}})
        dispatch({type:"resetCard"})
        setIsProcessing(false)
      }
      else{
       timer= setTimeout(() => {
        dispatch({type:"noMatched",payload:{first:fid,second:sid}})
        dispatch({type:"resetCard"})
        setIsProcessing(false)
        }, 500);
      }
      
    }
     
    return ()=>{
      if(timer) clearTimeout(timer)
      
    }

  },[uniqueCard])


  
  
  return <section className="h-full flex flex-col justify-center items-center ">
  <div className={`grid font-bold text-xl ${gridSize===4?"grid-cols-4":"grid-cols-6"} gap-4  w-full md:w-[90%] max-w-[400px] sm:max-w-[500px] md:max-w-[550px] md:gap-5 `}>

    { 
      gameData.map((data,i)=> <Card id={data.id} handleClick={handleClick}   settingCharacter={settingCharacter} uniqueId={data.uniqueId}  key={i} character={data.character} flipped={data.isFlipped}/>)
    }
  </div>
</section>
}

function Card({character,flipped,id,handleClick,uniqueId,settingCharacter}){

  // isOpen(opem=>{
  //   if(open.length>=2){
  //     return [id]
  //   }
  //   return [...open,id]
  // })
  
  // const output=settingCharacter==="num"?character:<Image width={70} height={70} priority src={`./${character}.svg`} alt="game icon" />

  return <div onClick={()=>{!flipped && handleClick(uniqueId,id) }} className={` text-whiteGray ${flipped?"bg-fairGray":"bg-darkerGray" } transition-all duration-300 cursor-pointer text-3xl rounded-xl flex items-center justify-center w-full aspect-square`} >
   { settingCharacter==="num"?(flipped && character):<Image width={70} height={70} priority src={`./${character}.svg`} alt="game icon" className={`${flipped ?"opacity-100":"opacity-0 w-[80%]"} `} />}
  </div>  

}
 