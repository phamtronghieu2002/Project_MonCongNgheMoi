import 'react-phone-input-2/lib/style.css';
import './formLogin.scss';
import PhoneInput from 'react-phone-input-2';
import clsx from 'clsx';
import * as authServices from '../../../services/authService';
import { useState, useContext } from 'react';
import { useLang } from '../../../hooks';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../providers/Auth/AuthProvider';
export default function FormLogin({}) {
    const { i18n, t } = useLang();
    const [phonenumber, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { login,getUser } = useContext(AuthContext);
        console.log('userContext:>>>',getUser());
    const handleLogin = async () => {
        try {
            const res = await authServices.login({ phonenumber, password });

            if (res.errCode === 0) {
                const user = res.data;
                login(user);
                console.log('userContext:>>>',user);
                toast.success(res.message);



                return;
            }
            toast.error(res.message);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div id="form-login">
            <div>
                <PhoneInput
                    country="vn"
                    placeholder={t('Login.placeholder.phone')}
                    value={phonenumber}
                    onChange={(value) => {
                        setPhone(`+${value}`);
                    }}
                />
            </div>
            <div className="input-group flex-nowrap mt-3" style={{ paddingRight: '10px',zIndex:0 }}>
                <span
                    style={{
                        padding: '0 0 0 10px',
                        width: '39.5px',
                        background: '#f5f5f5',
                    }}
                    className="input-group-text"
                    id="addon-wrapping"
                >
                    <i className="fa-solid fa-lock"></i>
                </span>
                <input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    style={{ height: '35px',zIndex: 0}}
                    type="password"
                    className="form-control"
                    placeholder={t('Login.placeholder.password')}
                />
            </div>
            <div
                onClick={handleLogin}
                className={clsx('btn btn-primary mt-3 w-100', password && phonenumber.length > 4 ? '' : 'disabled')}
            >
                {t('Login.button.login')}
            </div>

            <div className="forgot-password mt-4">
                <a href="#" className="text-center d-block fs-6 ">
                    {t('Login.button.forgot_password')}{' '}
                </a>
            </div>
        </div>
    );
}
