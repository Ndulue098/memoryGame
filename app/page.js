"use client"
import {useGame } from "@/components/contexts/Gamecontext";
import Finished from "@/components/Finished";
import Game from "@/components/Game";
import Navbar from "@/components/Navbar";
import Players from "@/components/Players";
import Settings from "@/components/Settings";
import Image from "next/image";

export default function Home() {
  const {status,gameSettings,players,playIndex,moves,dispatch,gameData}=useGame()
  const {gridsize}=gameSettings
  // console.log(status);
  const mins=Math.floor((5*gameData.length)/60)
    const second=(5*gameData.length)%60;

  
  const sortedPlayer=[...players].sort((a,b)=>b.score-a.score)
  const winnner=sortedPlayer.filter((player)=>player.score===sortedPlayer.at(0)?.score)
  // console.log(winnner);
  
  return (
    <main className="px-6 py-6 flex flex-col h-full md:px-8 lg:max-w-[1100px] mx-auto">
      <Navbar/>
      <Game/>
    
      <Players players={players} playIndex={playIndex}/> 
     {status==="play" && <Settings/>}
     {status==="finished"&&<Finished player={players}>
      <Finished.Layout>
        <Finished.GameHead >
          <h2 className="text-3xl text-verydarkerGray  font-bold md:text-3xl capitalize text-center">
            {winnner.length>1?"There is a tie":`Player ${sortedPlayer.at(0).players} Wins!`} 
          </h2>
          <p className="font-bold text-base text-center text-playerGray">Game over! Here are the results...</p>
        </Finished.GameHead>
        <Finished.GameData>
              {sortedPlayer.map((play,i)=>{return <div className={` ${i===0?"bg-darkerGray":"bg-[#DFE5EA]"} capitalize rounded-lg p-4 flex justify-between items-center`}  key={i}>
                    <p className={` ${i===0?"text-whiteGray":"text-playerGray"} text-base font-bold `}>player  {play.players} {i===0&&"(Winner)"}</p>
                    <p className={` ${i===0?"text-whiteGray":"text-verydarkerGray"} font-bold text-2xl `}>{play.score} Pairs</p>
              </div>} )}
        </Finished.GameData>
        <Finished.Button dispatch={dispatch}/>
      </Finished.Layout>
      
      </Finished>
      }


     {status==="timeup"&&<Finished player={players}>
      <Finished.Layout>
        <Finished.GameHead >
          <h2 className="text-3xl text-verydarkerGray font-bold md:text-3xl capitalize text-center">
            you did it!
        </h2>
        <p className="font-bold text-base text-center text-playerGray">Game over! Here&rsquo;s how you got on...</p>
        </Finished.GameHead>
        <Finished.GameData>
              <div className="bg-fairGray p-4 flex justify-between items-center rounded-lg">
                    <p className="text-base font-bold text-playerGray">Time Elapsed</p>
                    <p className="font-bold text-2xl text-verydarkerGray">{`${mins}`.padStart(2,0)}:{`${second}`.padStart(2,0)}</p>
                </div>
                <div className="bg-fairGray p-4 flex justify-between items-center rounded-lg ">
                    <p className="text-base font-bold text-playerGray">Moves Taken</p>
                    <p className="font-bold text-2xl text-verydarkerGray flex items-center">{moves} Moves</p>
              </div>
        </Finished.GameData>
        <Finished.Button dispatch={dispatch}/>
      </Finished.Layout>
      
      </Finished>
      }
     
    </main>
  );
}
