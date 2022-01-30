import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import './App.css';
import PlayersRankingList from './components/PlayersRankingList';
import {CSVLink} from 'react-csv'

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

     //We call the API to refresh the top every 10 seconds

     const interval = setInterval(() => fetchPlayersList(), 10000)
     return () => {
       clearInterval(interval);
     }
    }, []);

    //CSV INFO

    const csvHeaders = [
      {label : 'Nickname', key : 'nickname'},
      {label : 'Score' , key : 'score'}
    ];

    const csvReport = {
      filename : 'PSh-Game_report.csv',
      headers : csvHeaders,
      data : playersList.players_ranking
    }


    return hasLoaded ? (
    <div className='App'>
      <h1 id="PageTitle">PSh-Game Stats</h1>
      <PlayersRankingList list={playersList.players_ranking} last_modified_date={playersList.last_modified_date}/>
      <div>
        <CSVLink {...csvReport}><button className='btn btn-success'>Export to CSV</button></CSVLink>
      </div>
    </div>
    ) :
    <p>Loading . . .</p>
}

export default App;