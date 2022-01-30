import React from 'react'
import { PlayerData } from './PlayerData'

export function PlayersRankingList({list,last_modified_date}) {

    return (
      <div>
        <div id="TopList" className="list-group">
          {
            list.map(player =>
              <PlayerData key={player.nickname} player={player} />
            )
          }

        </div>
        <p>Last modified date : {last_modified_date}</p>
      </div>
      );

}

export default PlayersRankingList;
