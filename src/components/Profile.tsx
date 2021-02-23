import styles from '../styles/components/Profile.module.css'

export function Profile() {

    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66839023?s=460&u=b17a7dad2c056c06972b27a482002311fad87136&v=4" 
            alt="Leonardo Ferreira"/>
        <div>
        <strong>Leonardo Ferreira</strong>
        <p>Level 1</p>
        </div>
           
        </div>
    )
}