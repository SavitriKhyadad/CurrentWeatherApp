import React, {useState } from 'react';
import Auxiliry from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
//import 

const layout = () => {
  
    const api = {
        key:"13540a4d3e9a31b8b9f898ad5d18120d",
        base:"https://api.openweathermap.org/data/2.5/"
    }
    const [showSideDrawer, setShowSideDrawer] = useState(true);
    const [showWeather, setShowWeather] = useState(false);
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState({});

    const select = (props) => {
        if(props.key === "Enter") {
            fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(res => {
                setSearch('');
                setWeather(res);
                console.log(res);
                setShowWeather(true)
            });
        }
    }

    const modalCloseHandler = () => {
        setShowWeather(false);
    }

    const showModal = () => {
        setShowWeather(true);
    }

    const  sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        let status = showSideDrawer;
        setShowSideDrawer(!status)
    }

    return (
        <Auxiliry>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}/>
            <div className={classes.HeroImage}>
                <div className={classes.container}>
                    <h1><span>WEATHER</span></h1>
                    <span className={classes.subtext}>We provide current weather forecast</span>
                        <div className={classes.searchPart}>
                            <input type='text' placeholder='Search...' className={classes.searchBar} 
                            onChange={event => setSearch(event.target.value)}
                            value={search}
                            onKeyPress={select}
                            
                           />
                        </div>

                        <button onClick={showModal}  className={classes.Button}>ENTER</button>
                </div>
                {(typeof weather.main !== "undefined") ? (
                    <div>
                    <div>
                        <Modal show={showWeather} modalClosed={modalCloseHandler}>
                            <div className={classes.display}>
                                <div>{weather.name}, {weather.sys.country}</div>
                                <div>{Math.round(weather.main.temp)}°C</div>
                                <div>{weather.weather[0].main}</div>
                            </div>
                        </Modal>
                    </div>
                    </div>
                 ) : (
                    <div>
                    <Modal show={showWeather} modalClosed={modalCloseHandler}>
                        <div className={classes.display}>
                            <p>SORRY</p>
                            <p>NO SUCH CITY FOUND!</p>
                        </div>
                    </Modal>
                </div>
                 )}
            </div>
        </Auxiliry>
    );
}

export default layout;
