import React, { useState, useEffect, useRef } from 'react';
import {Card, CardBody, CardHeader, Chip, Divider} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const initialSnake = [[0, 1], [0, 0]];
const initialFood = [5, 5];
const directions = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
};

export const Game = ({ score, setScore, setGameEnd, setGameStart, settings, setLeaders, leaders }) => {
    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(initialFood);
    const [direction, setDirection] = useState([0, 1]);
    const moveRef = useRef(direction);
    moveRef.current = direction;

    useEffect(() => {
        const handleKeyDown = (e) => {
            const newDirection = directions[e.key];
            if (newDirection) {
                setDirection(newDirection);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const moveSnake = () => {
            setSnake((prevSnake) => {
                let newSnake = [...prevSnake];
                let head = [prevSnake[0][0] + moveRef.current[0], prevSnake[0][1] + moveRef.current[1]];
                if (head[0] === food[0] && head[1] === food[1]) {
                    newSnake = [head, ...newSnake];
                    setScore((prevScore) => prevScore + 1);
                    setFood([Math.floor(Math.random() * settings.boardSize), Math.floor(Math.random() * settings.boardSize)]);
                } else {
                    newSnake = [[head[0], head[1]], ...newSnake.slice(0, -1)];
                }
                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, settings.gameSpeed);
        return () => clearInterval(gameInterval);
    }, [settings.gameSpeed, food, settings.boardSize]);

    useEffect(() => {
        const checkCollision = () => {
            const [head, ...body] = snake;
            if (
                body.some(segment => segment[0] === head[0] && segment[1] === head[1]) ||
                head[0] < 0 || head[0] >= settings.boardSize ||
                head[1] < 0 || head[1] >= settings.boardSize
            ) {
                setLeaders((prevLeaders) => [...prevLeaders, { name: settings.playerName, score: score }]);
                setGameEnd(true);
                setGameStart(false);
            }
        };
        checkCollision();
    }, [snake, settings.boardSize, settings.playerName, score, setLeaders]);

    return (
        <div className="w-full flex justify-center h-[100vh] items-center">
            <Card>
                <CardHeader>
                    <p className="font-bold">Игровое поле</p>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <div className="flex gap-5">
                        <div
                            style={{
                                width: `${settings.boardSize * 20}px`,
                                height: `${settings.boardSize * 20}px`,
                                border: '1px solid black',
                                display: 'grid',
                                gridTemplateRows: `repeat(${settings.boardSize}, 20px)`,
                                gridTemplateColumns: `repeat(${settings.boardSize}, 20px)`,
                            }}
                        >
                            {Array.from({ length: settings.boardSize * settings.boardSize }).map((_, i) => {
                                const x = Math.floor(i / settings.boardSize);
                                const y = i % settings.boardSize;
                                const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
                                const isFood = food[0] === x && food[1] === y;
                                return (
                                    <div
                                        key={i}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: isSnake ? settings.snakeColor : isFood ? settings.foodColor : 'white',
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col gap-5">
                            <Chip color="success">Счет: {score}</Chip>
                            <Chip color="secondary">Имя: {settings.playerName}</Chip>
                            <Chip color="primary">Размер: {settings.boardSize}x{settings.boardSize}</Chip>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}