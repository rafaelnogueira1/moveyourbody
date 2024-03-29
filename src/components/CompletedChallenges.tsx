import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges() {
  const { challengeCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengeCompleted}</span>
    </div>
  )
}