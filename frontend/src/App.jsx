import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import './App.css';
import PlayersRankingList from './components/PlayersRankingList';

function App() {

  const [playersList, setPlayersList] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchPlayersList = async () => {
    const { data } = await Axios.get(
        "http://localhost:3000/api/players/ranking"
    );
    const playersList = data;
    setPlayersList(playersList);
    console.log(playersList);
    setHasLoaded(true);
    };

    useEffect(() => {
     fetchPlayersList();
    }, []);


    return hasLoaded ? (
    <div className='App'>
      <h1 id="PageTitle">PSh-Game Stats</h1>
      <PlayersRankingList list={playersList.players_ranking} last_modified_date={playersList.last_modified_date}/>
    </div>
    ) :
    <p>Loading . . .</p>
}

export default App;