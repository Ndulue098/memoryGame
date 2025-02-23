function consent(text,fn,time){
        let res=true
        if(time>20){
            res=confirm(text)
        }
        res  && fn()
}

export  function ResetButton({secRemaining,onclick,full}) {
    return <button onClick={()=>consent("are u sure u want to reset?",onclick,secRemaining)} className={`${full && "flex-1 rounded-full primary py-3 text-xl w-full text-whiteGray font-semibold bg-fairGray"} px-5 py-2 bg-orange rounded-full font-bold `}>Restart</button>
             {/* <button onClick={()=>dispatch({type:"play"})}  className="px-4 py-2 bg-gray-400 rounded-full font-semibold ">New Game</button> */}       
}
export  function NewGameButton({secRemaining,onclick,full}) {
    return <button onClick={()=>consent("are u sure u want to start new game?",onclick,secRemaining)}  className={`${full ? "flex-1 rounded-full primary py-3 text-xl w-full text-darkerGray font-semibold bg-fairGray":" px-5 py-2 bg-fairGray text-darkerGray font-bold rounded-full"}  `}>New Game</button>   
}

