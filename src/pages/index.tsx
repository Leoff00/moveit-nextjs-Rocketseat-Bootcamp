import { CompletedChallenges } from '../components/CompletedChallenges';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css'
import { Countdown } from "./../components/Countdown";
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { GetServerSideProps } from 'next';
import {ChallengesProvider} from '../contexts/ChallengeContext'


export default function Home(props) {

  console.log(props);

    return (

      <ChallengesProvider level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar/>

      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
          <ChallengeBox/>
          </div>
        </section>
        </CountdownProvider>
    </div>
    </ChallengesProvider>
    )
  }

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2
  }  

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  console.log(user);
  
  return {
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted)
      }
    }

}
  