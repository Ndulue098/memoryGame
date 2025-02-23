
export default function Players({players,playIndex}) {

    return <div className="flex items-center justify-between gap-4">
            {players.map((play,i)=><div key={i}  className={`   relative text-playerGray ${playIndex===i?"text-whiteGray arror bg-orange":"bg-fairGray"} flex flex-col items-center justify-center lg:flex-row lg:justify-between lg:p-4 md:items-start lg:items-center gap-2 md:gap-1 flex-1 w-[100px] p-3 rounded-lg`}>
                <p className="hidden md:block capitalize font-bold text-lg">player {play.players}</p>
                <p className="md:hidden uppercase font-bold text-2xl md:text-lg">p{play.players}</p>

                <p className={`font-bold text-4xl md:text-3xl  ${playIndex===i?"text-whiteGray":"text-darkerGray"}`}>{play.score}</p>
            </div>
            )} 

        </div>
}

