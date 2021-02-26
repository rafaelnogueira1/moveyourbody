import { useContext } from 'react';
import { CountDownContext } from '../context/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export default function CountDown() {
  const {
    minutes,
    seconds,
    hasFinish,
    isActive,
    resetCountDown,
    startCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinish ? (
        <button type='button' className={`${styles.countDownButton}`} disabled>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type='button'
              className={`${styles.countDownButton} ${styles.countDownButtonIsActive}`}
              onClick={resetCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type='button'
              className={styles.countDownButton}
              onClick={startCountDown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
}
