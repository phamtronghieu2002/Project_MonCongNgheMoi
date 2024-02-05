import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import './style.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { useLang } from '../../../hooks';
import ModalOTP from '../../../components/ModalOTP/ModalOTP';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import configs from '..//..//..//configs';
export default function FormAuthPhone({ setPhoneRegister, setIsAuthPhone }) {
    const [phone, setPhone] = useState('');
    const [isOpenModalOTP, setIsOpenModalOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useLang();
    const auth = configs.firebase.auth;
    console.log('====================================');
    console.log(phone);
    console.log('====================================');
    const handleOpenModal = (isOpen) => {
        setIsOpenModalOTP(isOpen);
    };

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response) => {
                    // onSignup();
                },
                'expired-callback': () => {},
            });
        }
    }

    function onSignup() {
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
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {isOpenModalOTP && <ModalOTP onClose={handleOpenModal} onConfirm={onOTPVerify} />}
        </div>
    );
}
