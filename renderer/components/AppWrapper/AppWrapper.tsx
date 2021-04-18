import s from './AppWrapper.module.css';

const AppWrapper = ({ children }) => {
	return <div className={s.Wrapper}>{children}</div>;
};

export default AppWrapper;
