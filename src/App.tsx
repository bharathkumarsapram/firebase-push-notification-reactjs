import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { messaging, requestForToken } from './firebase/firebase';
import { MessagePayload, onMessage } from 'firebase/messaging';
import { ToastContainer, toast } from 'react-toastify';

function App() {
	const requestMessage = async () => {
		await requestForToken();
		onMessage(messaging, (payload: MessagePayload) => {
			console.log('payload', payload);
			toast(payload?.notification?.title);
		});
	};
	useEffect(() => {
		requestMessage();
	}, []);
	return (
		<div className='App'>
			<ToastContainer />
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
