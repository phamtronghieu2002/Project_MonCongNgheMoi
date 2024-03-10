import 'react-phone-input-2/lib/style.css';
import './style.scss';
import { useLang } from '../../../hooks';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import clsx from 'clsx';
import ModalOTP from '../../../components/Modal/ModalOTP/ModalOTP';
import configs from '..//..//..//configs';
import * as authServices from '../../../services/authService';
export default function FormAuthPhone({ setPhoneRegister, setIsAuthPhone }) {
    const [phone, setPhone] = useState('');
    const [isOpenModalOTP, setIsOpenModalOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useLang();
    const auth = configs.firebase.auth;

    const handleOpenModal = (isOpen) => {
        setIsOpenModalOTP(isOpen);
    };

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response) => {
                    onSignup();
                },
                'expired-callback': () => { },
            });
        }
    }

    async function onSignup() {
        try {
            const res = await authServices.checkExitPhone(`+${phone}`); // `+${phone}
            if (res.errCode) {
                toast.error(res.message);
                return;
            }
            setLoading(true);
            onCaptchVerify();
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setLoading(false);
                    toast.success('OTP sended successfully!');
                    handleOpenModal(true);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }

    function onOTPVerify(otp) {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                toast.success('xác minh thành công !!!');
                setPhoneRegister(phone);
                setLoading(false);
                setIsAuthPhone(true);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div>
            <PhoneInput country="vn" placeholder={t('Login.placeholder.phone')} value={phone} onChange={setPhone} />
            <div
                type="button"
                onClick={() => {
                    onSignup();
                }}
                className={clsx(
                    'btn btn-primary w-100 mt-3 d-flex justify-content-center align-items-center',
                    phone.length < 3 ? 'disabled' : '',
                )}
            >
                <span> {t('Login.button.send_otp')}</span>
                {loading && <span className="loader"></span>}
            </div>
            <div id="recaptcha-container"></div>
            {isOpenModalOTP && <ModalOTP onClose={handleOpenModal} onConfirm={onOTPVerify} />}
        </div>
    );
}
