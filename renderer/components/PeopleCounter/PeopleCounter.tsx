import s from './PeopleCounter.module.css';
import UserScreen from '../UserScreen/UserScreen';

const PeopleCounter = () => {
  return (
    <div className={s.Wrapper}>
      <UserScreen />
    </div>
  );
};

export default PeopleCounter;
