import { useState ,useEffect } from 'react';
import EzReactTable from "ez-react-table" ;
import './App.css';
import coin from './images/coin1.gif'

function App() {
  const [coins , setCoins] = useState([]);

  const fetchCoins = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      const data = await res.json();
      setCoins(data);
    } catch (e){
      alert('ARI Error');
    }
  }
  useEffect(() => {
    fetchCoins();
  }, []);
  
  const columns = [
    {
      title: "Name",
      key : "name",
      width: 200,
      render: (value , object) => {
        return (
          <div sytle={{display:"flex",alignItems: "center"}}>
            <img heigth="20px" width="20px" src={object?.image} alt="coin"/>
            <span style={{ marginLeft: "10px" }} >{object?.name}</span>
          </div>
        )
      }
    },
    {
      title:"Price",
      key: "current_price",
      width:100,
      render:(value,object) => <div>{`$${value}`}</div>
    },
    {
      title:"change",
      key:"price_change_percentage_24h",
      width:100,
      render: (value,object) =>{
        return (
          <div style={{ color: /-/.test(value) ? "#5f5f5f" : "#f49740"}}>
            {value}%
          </div>
        )
      }
    },
  ]

  return (
    <div className="App">
     
      <div className="header">
        <img src={coin} alt="coin" width="200px" /> 
        <h1 className="nav__logo">Swap<span>Pai</span></h1>
      </div>
   
     
      <div className="body">
      <EzReactTable 
      cols={columns}
      data={coins}
      //กำหนดความสูงของการแสดงข้อมูล
      rowHeight={50}
      //ทีมสี
      darkMode={false} //true
      //ชื่อหัว
      title="Crypto Tracker"
      //มีปุ่มเรียงชื่อที่ cols name
      defaultSort="name"
      //กำหนดสี
          accentColor="#f49740"
      tableHeigth={200}
      //ปุ่มอัพเดตข้อมูล
      // update
      //ช่องติก
      //selectable
      />
    </div>
      <div class="custom-shape-divider-bottom-1637255790">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill"></path>
        </svg>
      </div>
    </div>

  );
}

export default App;
