import {createContext, useState, ReactNode} from 'react';
import challenges from '../../challenges.json';

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

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    const experienceToNextlevel = Math.pow((level + 1) * 4, 2);

    //atribuindo ao contexto "Provider" as funcionalidades para cada componente
    //ex: ExperienceBar = currentExperience, experienceToNextLevel.

    return (
        <ChallengesContext.Provider value=
        {{level,
        experienceToNextlevel,
        currentExperience, 
        challengesCompleted, 
        levelUp, 
        startNewChallenge,
        activeChallenge,
        resetChallenge}}>
        
        {children}

        </ChallengesContext.Provider>
    
    )
}