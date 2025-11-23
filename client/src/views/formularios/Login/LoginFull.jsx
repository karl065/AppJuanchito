import { useState } from 'react';
import LoginForm from './Login.jsx';
import Setup2FA from './Setup2FA.jsx';
import Login2FA from './Login2FA.jsx';
import { loginAction } from '../../../redux/admin/actions/loginAction.jsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginFull = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [step, setStep] = useState('login'); // 'login' | 'setup2FA' | 'login2FA'
	const [twoFAData, set2FAData] = useState({});

	return (
		<>
			{step === 'login' && (
				<LoginForm
					onSubmit={(values) =>
						loginAction(values, dispatch, navigate, setStep, set2FAData)
					}
				/>
			)}
			{step === 'setup2FA' && <Setup2FA data={twoFAData} setStep={setStep} />}
			{step === 'login2FA' && <Login2FA data={twoFAData} setStep={setStep} />}
		</>
	);
};

export default LoginFull;
