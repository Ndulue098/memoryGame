"use client"

import { useEffect, useState } from "react";
import { useGame } from "./contexts/Gamecontext";
import Link from "next/link";

export default function Settings() {
    const [character,setChar]=useState("num");
    const [playersNum,setPlayers]=useState(1);
    const [gridSize,setGridSize]=useState(4)
    
    
    const {dispatch}=useGame()
    
    useEffect(function(){
        dispatch({type:"gameSetting",payload:{character,playersNum,gridSize}})
    },[character,playersNum,gridSize])

 
    return <div className="fixed inset-0 bg-custom-gradient text-playerGray flex flex-col px-5">
                <div className="my-auto"> 
                <h2 className="text-2xl font-bold md:text-3xl mb-14 text-orange text-center uppercase tracking-widest">Succinct</h2>
                    <div className=" bg-black p-7 max-w-[500px] rounded-2xl mx-auto">
                        <SettingType name={"select theme"}>
                            <Button onclick={setChar} datatype="character" data={"num"}>Pictures</Button>
                            <Button onclick={setChar} datatype="character" data={"icon"}>Icons</Button>
                        </SettingType>

                        <SettingType name={"Number of Players"}>
                            <Button onclick={setPlayers} datatype="playersNum" data={1}>1</Button>
                            <Button onclick={setPlayers} datatype="playersNum" data={2}>2</Button>
                            <Button onclick={setPlayers} datatype="playersNum" data={3}>3</Button>
                            <Button onclick={setPlayers} datatype="playersNum" data={4}>4</Button>
                        </SettingType>

                        <SettingType name="grid size">
                            <Button onclick={setGridSize} datatype="gridSize" data={4}>4x4</Button>
                            <Button onclick={setGridSize} datatype="gridSize" data={6}>6x6</Button>
                        </SettingType>

                        <button onClick={()=>dispatch({type:"ready"})} className=" flex-1 rounded-full primary py-4 text-xl w-full text-whiteGray font-semibold bg-orange">
                            Start Game
                        </button> 
                    </div>
                    <p className="text-center">
                    Coded by { }
                    <Link href="https://x.com/Ndulue47" target="_blank" >@Ndulue47</Link>
                    </p>
                </div>
        </div>
}

function Button({children,type,onclick,data,datatype}){ 
    const {gameSettings}=useGame()    
    
    return <button onClick={()=>onclick(data)} className={`  ${gameSettings[datatype]===data?"bg-fairGray text-black":"bg-darkerGray "} py-3 text-xl flex-1 rounded-full`}>
        {children}
    </button>
} 

function SettingType({children,name}){
    return <div className="mb-7"> 
        <p className="text-base font-semibold capitalize mb-2 text-gray-500">{name}</p> 
    <div className="flex justify-between items-center gap-2 md:gap-4 text-lg font-semibold text-gray-100">
        {children}
    </div>
    </div>
}









