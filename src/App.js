import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { LuCloudRainWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import './App.css';
import Skeleton from 'react-loading-skeleton';
import BeatLoader from "react-spinners/ClipLoader";
const api={
   key:"989bb7866a84914461d903bc9eb3f756",
   base:`http://api.openweathermap.org/data/2.5/`
}
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['January','February','March','April','May','June','August','September','October','November','December'];
function App() {
  const date=new Date();
  const [input,setinput]=useState("");
  const [weather,setweather]=useState({});
  const [time,settime]=useState("");
  const [loading,setloading]=useState(true);
  
  const onpressenter=(ent)=>{
    if(ent.key==="Enter"){
      fetch(`${api.base}weather?q=${input}&units=metric&APPID=${api.key}`).then(result=>result.json()).then(res=>{console.log(res);
        setweather(res)});
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      setloading(false);
    },1000)
  },[]);
  useEffect(
    ()=>{
      const update=setInterval(()=>{
           settime(date.toLocaleTimeString());
      },3000)
      //  console.log("here");
      return ()=>clearInterval(update);
    }
  )

 
  return (
    <div className="App">
       {loading? (<div> <BeatLoader
        color={"#1de9f0"}
        loading={loading}
        size={100}
      /></div>):
      ( <><div className='Appin'><div className='first'>
       <div className='country'>
        <p className='dis'>{weather.name===undefined?
            <>{<FaLocationDot  strokeWidth={10}  stroke='#18baf0' />}NO STATUS FOUND OR WRONG INPUT</>:
            <>{ <FaLocationDot strokeWidth={10}  stroke='#18baf0'  /> } {weather.name},</>
         }</p>
         <p className='cou'>{weather.sys===undefined?"STATUS UNKNOWN":`${weather.sys.country}`}</p>
       </div>
      
       <div className='day-temp'>
       <div className='date-time'>
       <div className='time'> 
            {`${time===''?date.toLocaleTimeString():time}`}
       </div>


       <div className='date'>
       {`${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear() ||<Skeleton baseColor='#91edea' highlightColor='#24c7c1'/>}`}
       </div>
       </div>
       
       <div className='temp'>
        {weather.main===undefined?loading?<Skeleton baseColor='#91edea' highlightColor='#24c7c1'/>:"0°C":(`${parseFloat(weather.main.temp).toFixed(1)}°C`)}
       </div>

       </div>
       </div>
       <div className='second'>
       <div className='icon'>
        {weather.main!==undefined?(<div className='icon-img'><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="NO ICON FOUND"></img><p className='climate'>{`${weather.weather[0].main}`}</p></div>):(<div className='icon-img'><img src={`https://openweathermap.org/img/wn/02d@2x.png`} alt="NO ICON FOUND"></img><p className='climate'>STATUS UNKNOWN</p></div>)
        }
        </div>
       <div className="text_val">
       <input  type="text" placeholder="Search"
       onChange={e=>setinput(e.target.value)}
       value={input}  onKeyPress={(ent)=>{onpressenter(ent)}}>
       </input>
       </div>
        <div className='features'>
            <div><p className='que'><IoIosSpeedometer /> WindSpeed </p><p>: </p><p>{`${weather.wind===undefined?"UNKNOWN":weather.wind.speed}`}</p></div>
            <div><p className='que'><LuCloudRainWind /> Pressure </p><p>: </p><p>{`${weather.wind===undefined?"UNKNOWN":weather.main.pressure}`}</p></div>
            <div><p className='que'><WiHumidity /> Humidity </p><p>: </p><p>{`${weather.wind===undefined?"UNKNOWN":weather.main.humidity}`}</p>
            </div>
        </div>
        </div></div>
        </>)}
    </div>
  );
}

export default App;
