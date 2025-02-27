import { createContext } from "react"
import {ResetButton,  NewGameButton } from "./ui/Button"
const FinishedContext=createContext();

export default function Finished({children}){
    return <FinishedContext.Provider value={{}}>
        {children}
    </FinishedContext.Provider>
}

Finished.Layout=function Layout({children}){
    return <div className=" inset-0    fixed    bg-[#7D7D7D]/70 text-gray-900 flex flex-col px-5">
        <div className="my-auto">
            <div className="bg-black p-6 max-w-[500px] rounded-2xl mx-auto">
               {children} 
            </div>   
        </div>
    </div> 
}

Finished.GameHead=function GameHead({children}){
    return <div className="flex flex-col gap-2 mb-8">

        {children}
    </div>
}

Finished.GameData=function GameData({children}){
    return <div className="flex flex-col gap-2 mb-8">
        {children} 
    </div>
}

Finished.Button=function Button({dispatch}){
    return <div className="flex flex-col md:flex-row gap-3">
    <ResetButton full={true} onclick={()=>dispatch({type:"reset"})} />
    <NewGameButton full={true} onclick={()=>dispatch({type:"play"})} />
    {/* <button className=" flex-1 rounded-full primary py-3 text-xl w-full text-gray-100 font-semibold bg-gray-500">
        Restart
    </button>
    <button className=" flex-1 rounded-full primary py-3 text-xl w-full text-gray-100 font-semibold bg-yellow-500">
        Setup new game
    </button> */}
</div>
}  