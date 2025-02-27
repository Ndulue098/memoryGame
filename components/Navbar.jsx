"use client"
import { useEffect, useRef, useState } from "react"
import { useGame } from "./contexts/Gamecontext"
import {ResetButton,  NewGameButton } from "./ui/Button"
import Image from "next/image"

export default function Navbar() {
    const {dispatch,secRemaining,moves,status}=useGame()
    const mins=Math.floor(secRemaining/60)
    const second=secRemaining%60;

    const navRef=useRef(null);
    const [trackOpen,setTrackOpen]=useState(false)

    useEffect(function(){
        function listen(e){
            if(navRef && !navRef.current.contains(e.target) && !e.target.closest("#menuButton")){
                navRef.current.style.transform="translateX(10rem)"
                setTrackOpen(false)
            }
        }

        document.addEventListener("mousedown",listen)

        return ()=>document.removeEventListener("mousedown",listen)
    },[])

    function toggleMenu(){
        if(trackOpen){
            navRef.current.style.transform="translateX(10rem)"
            setTrackOpen(false)
        }
        else{
            navRef.current.style.transform="translateX(0rem)"
            setTrackOpen(true)
        }
    }


    useEffect(() => {
        if (secRemaining <= 0 || status!=="ready") return; // Stop the interval if time is up
        
        const id = setInterval(() => {
          dispatch({ type: "tick" });
        }, 1000);
      
        return () => clearInterval(id);
      }, [dispatch, secRemaining,status]);
 
    return <nav className="flex justify-between items-center ">
            <h2 className="text-3xl md:text-3xl text-darkerGray font-bold text-orange text-center uppercase tracking-widest">
              <Image width={30} height={30} src={"/Succ.jpg"} alt=""/>
            </h2> 
            <div className="flex justify-between items-center gap-3 sm:gap-12 text-gray-500">
                <div className="flex flex-col items-center  w-[50%] py-2 ">
                    <p className="text-xs sm:text-sm font-bold capitalize text-gray-400">Time</p>
                    <p className="text-lg font-bold sm:text-2xl">{`${mins}`.padStart(2,0)}:{`${second}`.padStart(2,0)}</p> 
                </div>
                <div className="flex flex-col items-center  w-[50%] py-2 ">
                    <p className="text-xs sm:text-sm font-bold capitalize text-gray-400">Moves</p>
                    <p className="font-bold sm:text-2xl text-lg">{moves}</p>
                </div>
            </div>

            <div className="md:hidden">   
                <button id="menuButton" onClick={toggleMenu} className="px-4 py-2 bg-orange rounded-full font-semibold ">Menu</button>
                <div ref={navRef} className=" bg-black   p-3 flex flex-col gap-2 rounded-lg     fixed       mt-3 right-0 max-w-[19rem] md:hidden transition-transform duration-700 ease-in-out">
                    <ResetButton secRemaining={secRemaining} onclick={() => {dispatch({ type: "reset" });toggleMenu();}} />
                    <NewGameButton secRemaining={secRemaining} onclick={() => {dispatch({ type: "play" });toggleMenu();}} />
                    {/* <button onClick={() => {dispatch({ type: "reset" });toggleMenu();}} className="px-4 py-2 flex-1 bg-orange rounded-full font-semibold text-whiteGray ">Restart</button> */}
                    {/* <button onClick={() => {dispatch({ type: "play" });toggleMenu();}} className="px-4 py-2 bg-fairGray rounded-full font-semibold text-darkerGray ">New Game</button> */}
                </div>
            </div>

            <div className="hidden md:flex gap-4 text-xl">
                <ResetButton secRemaining={secRemaining} onclick={()=>dispatch({type:"reset"})} />
                <NewGameButton secRemaining={secRemaining} onclick={()=>dispatch({type:"play"})} />
            </div>
        </nav>
} 

