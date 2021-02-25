import {createContext, useState, ReactNode} from 'react';
import challenges from '../../challenges.json';
import { useEffect } from "react";

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number  ;  
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextlevel: number;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData) 
//exportando o contexto  e adicionando uma tipagem a ele

//adicionando uma interface pra funcao ter tipagem
export function ChallengesProvider({children} : ChallengesProviderProps) { 

    //criando os estados para serem usados nos contextos dos componentes
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextlevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }
    , [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();


        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎯', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if(!activeChallenge) {
            return;
        }
        
        const { amount } = activeChallenge; 

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextlevel) {
            finalExperience = finalExperience - experienceToNextlevel;
            levelUp();
        }
    
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

   

    //atribuindo ao contexto "Provider" as funcionalidades para cada componente
    //ex: ExperienceBar = currentExperience, experienceToNextLevel.

    return (
        <ChallengesContext.Provider value=
        {{level,
        experienceToNextlevel,
        currentExperience, 
        challengesCompleted,
        completeChallenge,
        levelUp, 
        startNewChallenge,
        activeChallenge,
        resetChallenge}}>
        
        {children}

        </ChallengesContext.Provider>
    
    )
}