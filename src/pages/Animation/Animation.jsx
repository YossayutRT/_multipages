import React, { useState, useEffect } from 'react';
import './Animation.css';

import basketball from '../../assets/Basketball.png';
import football from '../../assets/Ball.png';
import volleyball from '../../assets/Volleyball.jpg';
import human from '../../assets/yossayut.jpg';
import cartoon from '../../assets/MSK.png';
import logo from '../../assets/Hamp.png';

const fiedlWidth = 800;
const fiedlHeight = 400;
const diameter = 100;
const maxLeft = fiedlWidth - diameter - 2;
const maxTop = fiedlHeight - diameter - 2;
const speed = 7; // ปรับความเร็วลูกบอล

const Animation = () => {
    const [image, setImage] = useState('none');
    const [selectedType, setSelectedType] = useState('none'); 
    const [running, setRunning] = useState(true); 
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [direction, setDirection] = useState({ goRight: true, goDown: true });

    const runClick = () => {
        setRunning(!running);
    };

    const changeImage = (Phototype) => {
        let imagePath = 'none';

        switch (Phototype) {
            case 'basketball':
                imagePath = basketball;
                break;
            case 'football':
                imagePath = football;
                break;
            case 'volleyball':
                imagePath = volleyball;
                break;
            case 'human':
                imagePath = human;
                break;
            case 'cartoon':
                imagePath = cartoon;
                break;
            case 'logo':
                imagePath = logo;
                break;
            default:
                break;
        }

        setImage(imagePath);
        setSelectedType(Phototype); 
    };

    const calculatePosition = () => {
        let { x, y } = position;
        let { goRight, goDown } = direction;

        if (x >= maxLeft) {
            goRight = false;
        }
        if (x <= 0) {
            goRight = true;
        }
        if (y >= maxTop) {
            goDown = false;
        }
        if (y <= 0) {
            goDown = true;
        }
        x = goRight ? x + speed : x - speed;
        y = goDown ? y + speed : y - speed;  

        setPosition({ x, y });
        setDirection({ goRight, goDown });
        setRotation((prev) => (prev + 3) % 360);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                calculatePosition();
            }
        }, 25); 
        return () => clearInterval(interval);
    }, [running, position, direction]);

    useEffect(() => {
        setPosition({
            x: (fiedlWidth / 2) - (diameter / 2),
            y: (fiedlHeight / 2) - (diameter / 2),
        });
    }, []);

    // เพิ่ม event listener สำหรับการกดคีย์บอร์ด
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.code) {
                case 'Space':
                    runClick();
                    break;
                case 'Digit0':
                    changeImage('none'); 
                    break;
                case 'Digit1':
                    changeImage('basketball');
                    break;
                case 'Digit2':
                    changeImage('football');
                    break;
                case 'Digit3':
                    changeImage('volleyball');
                    break;
                case 'Digit4':
                    changeImage('human');
                    break;
                case 'Digit5':
                    changeImage('cartoon');
                    break;
                case 'Digit6':
                    changeImage('logo');
                    break;
                default:
                    break;
            }
        };

       
        document.addEventListener('keydown', handleKeyDown);

        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [running]);

    return (
        <div id="container">
            <div id="field">
                <div
                    id="ball"
                    style={{
                        backgroundImage: image !== 'none' ? `url(${image})` : 'none',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: `rotate(${rotation}deg)`,
                        width: `${diameter}px`,
                        height: `${diameter}px`,
                    }}
                />
            </div>

            <div id="control">
                <button
                    id="run"
                    className={`btn ${running ? 'btn-danger' : 'btn-success'} me-4`}
                    onClick={runClick}
                >
                    <span className={`bi ${running ? 'bi-pause' : 'bi-play'}`}>
                        &nbsp;{running ? 'Pause' : 'Run'}
                    </span>
                </button>

                {['none', 'basketball', 'football', 'volleyball', 'human', 'cartoon', 'logo'].map((type) => (
                    <React.Fragment key={type}>
                        <input
                            type="radio"
                            className="btn-check"
                            name="options-outlined"
                            id={type}
                            autoComplete="off"
                            defaultChecked={selectedType === type} 
                            onClick={() => changeImage(type)}
                        />
                        <label
                            className={`btn ${selectedType === type
                                ? (type === 'none' ? 'btn-dark' : 'btn-primary') 
                                : 'btn-outline-primary'}`} 
                            htmlFor={type}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Animation;
