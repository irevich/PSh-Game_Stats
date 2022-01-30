import React from 'react'

export function PlayerData({player}) {
  
    const {nickname,score} = player;

    return (
      <div>
          <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Nickname : {nickname}</h5>
              <p className="text-muted">Score : {score}</p>
            </div>
          </div>
      </div>
  )
}

export default PlayerData;