import { useState, useEffect } from 'react';
import Variable from '../Variable/Variable';
import './Temperature.css';

function Temperature() {
    const [celsius, setCelsius] = useState(25);
    const [fahrenheit, setFahrenheit] = useState(77);
    const [kelvin, setKelvin] = useState(298.15);

    useEffect(() => {
        setFahrenheit((celsius * 9/5) + 32);
        setKelvin(celsius + 273.15);
    }, [celsius]);
    
    useEffect(() => {
        setCelsius((fahrenheit - 32) * 5/9);
    }, [fahrenheit]);
    
    useEffect(() => {
        setCelsius(kelvin - 273.15);
    }, [kelvin]);

    return (
        <div className="temperature-container">
            <h3 className="temperature-title">TEMPERATURES</h3>
            <h3 className='temperature-display'>
                <span className='badge bg-primary'>{celsius.toFixed(2)} °C</span> 
                <span className='badge bg-primary'>{fahrenheit.toFixed(2)} °F</span>  
                <span className='badge bg-primary'>{kelvin.toFixed(2)} °K</span> 
            </h3>
            <div className="temperature-variables">
                <Variable name={'Celsius'} value={celsius} setValue={setCelsius} />
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={setFahrenheit} />
                <Variable name={'Kelvin'} value={kelvin} setValue={setKelvin} />
            </div>
        </div>
    );
}

export default Temperature;