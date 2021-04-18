import { useEffect, useState } from 'react';
import s from './SettingsScreen.module.css';
import axios from 'axios';
// @ts-ignore
import BackArrow from './back.svg';
import Link from 'next/link';

const SettingsScreen = () => {
	const [number, setnumber] = useState(0);
	const [status, setstatus] = useState(false);
	const [sent, setsent] = useState(false);
	let timeout:NodeJS.Timeout;

	const postSettings = () => {
		setstatus(false);
		setsent(false);
		axios
			.post('http://localhost:8000/changeVals', {
				maxPeople: number,
			})
			.then(() => onSuccess())
			.catch(() => onError());
	};

	useEffect(() => {
		return () => clearTimeout(timeout);
	}, []);

	function onSuccess() {
		setstatus(true);
		setsent(true)
	}

	function onError() {
		setstatus(false);
		setsent(true)
	}

	function parsenum(evt:any) {
		if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
			evt.preventDefault();
		}
	}

	return (
		<div className={s.Wrapper}>
			<div className={s.SettingsWindow}>
				{/* @ts-ignore */}
				<Link  href="/home">
					<a className={s.BackArrow}>
						<BackArrow />
					</a>
				</Link>
				<div className={s.SettingsContainer}>
					<div className={s.SettingsInput}>
						<label htmlFor="">Ievadiet maksimālo cilvēku skaitu</label>
						<input
							type="number"
							onChange={(e:any) => setnumber(Number(e.target?.value || 0))}
							onKeyPress={(e) => parsenum(e)}
						/>
					</div>
					<button
						className={s.SettingsConfirm}
						onClick={() => postSettings()}
						disabled={number === 0}
					>
						Saglabāt
					</button>
					{sent ? (
						<span className={s.SettingsStatus} data-status={status.toString()}>
							{status ? 'Izmaiņas saglabātas' : 'Izmaiņas netika saglabātas'}
						</span>
					) : (
						null
					)}
				</div>
			</div>
		</div>
	);
};

export default SettingsScreen;
