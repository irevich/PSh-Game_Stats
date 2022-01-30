import React from 'react'
import { PlayerData } from './PlayerData'

export function PlayersRankingList({list,last_modified_date}) {

    let topListDivContent = <p>There are not players yet</p>;
    if(list.length!==0){
      topListDivContent= list.map(player =><PlayerData key={player.nickname} player={player} />);
    }
    return (
      <div>
        <div id="TopList" className="list-group">
          {topListDivContent}
        </div>
        <p>Last modified date : {last_modified_date}</p>
      </div>
      );

}

export default PlayersRankingList;
