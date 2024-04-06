import 'react-phone-input-2/lib/style.css';
import clsx from 'clsx';
import PhoneInput from 'react-phone-input-2';
import Loading from '../../../components/Loading/Loading';
import ModalOTP from '../../../components/Modal/ModalOTP/ModalOTP';
import configs from '..//..//..//configs';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { checkValidPhoneNumber } from '../../../utils/phoneUltil';
import { isValidUsername } from '../../../utils/regexUtil';
import { useState } from 'react';
import { useLang } from '../../../hooks';
import { toast } from 'react-hot-toast';
import * as authServices from '../../../services/authService';
export default function FormRegister({ onSuccess,setIsAuthPhone }) {
    const { t } = useLang();

    const [phone, setPhone] = useState('');
    const [isOpenModalOTP, setIsOpenModalOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingAnimation, setPendingAnimation] = useState(false);
    const auth = configs.firebase.auth;

    console.log(phone)
    const [dataForm, setDataForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleRegister = async () => {
        if (dataForm.password !== dataForm.confirmPassword) {
            toast("Password and confirm password don't match", {
                type: 'error',
            });
            return;
        }
        try {
            const res = await authServices.register({
                username: dataForm.username,
                password: dataForm.password,
                phonenumber: `+${phone}`,
            });
            toast.success(res.message);

            onSuccess();
        } catch (error) {
            console.log(error);
            toast.success(error.data.message || 'Register failed');
        }
    };

    const handleChangeInput = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };

     
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
                'expired-callback': () => {},
            });
        }
    }

    //hàm gửi otp
    async function onSignup() {
        try {
            if (!checkValidPhoneNumber(`${phone}`, 'VN')) {
                toast.error('Số điện thoại không đúng định dạng hoặc không hợp lệ!!!');
                return;
            }
            const res = await authServices.checkExitPhone(`+${phone}`); // `+${phone}
            if (res.errCode) {
                toast.error(res.message);
                return;
            }
            onCaptchVerify();
            setPendingAnimation(true);
            setLoading(true);
        
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, `+${phone}`, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setLoading(false);
                    toast.success('OTP sended successfully!');
                    handleOpenModal(true);
                    setPendingAnimation(false);
                })
                .catch((error) => {
                    console.log(error);
                    setPendingAnimation(false);
                    toast.error("OTP can't send, please try again!");
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
        }
    }
    //hàm xác thực otp
    function onOTPVerify(otp) {
        setLoading(true);
        setPendingAnimation(true)
        window.confirmationResult
            .confirm(otp)
            .then((res) => {
                setPendingAnimation(false)
                toast.success('xác minh thành công !!!');
                setLoading(false);
                handleRegister();
                setIsAuthPhone(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error('OTP không chính xác,hoặc hết hạn !!!');
                setLoading(false);
                setPendingAnimation(false)
            });
    }
    return (
        <div>
            <div>
                {pendingAnimation && <Loading pendingAction />}
                <PhoneInput country="vn" placeholder={t('Login.placeholder.phone')} value={phone} onChange={setPhone} />

                <div id="recaptcha-container"></div>
                {isOpenModalOTP && (
                    <ModalOTP
                        phoneNumber={phone}
                        onChangePhone={() => {
                            setLoading(false);
                        }}
                        onResendOTP={onSignup}
                        onClose={handleOpenModal}
                        onConfirm={onOTPVerify}
                    />
                )}
            </div>
            {/*  */}
            <div className="input-group flex-nowrap mt-2" style={{ paddingRight: '10px' }}>
                <span
                    style={{
                        padding: '0 0 0 10px',
                        width: '40px',
                        background: '#f5f5f5',
                    }}
                    className="input-group-text"
                    id="addon-wrapping"
                >
                    <i className="fa-solid fa-user"></i>
                </span>
                <input
                    name="username"
                    value={dataForm.username}
                    onChange={handleChangeInput}
                    style={{ height: '35px' }}
                    className="form-control"
                    placeholder={t('Register.placeholder_username')}
                />
            </div>
      
            <div className="input-group flex-nowrap mt-2" style={{ paddingRight: '10px' }}>
                <span
                    style={{
                        padding: '0 0 0 10px',
                        width: '40px',
                        background: '#f5f5f5',
                    }}
                    className="input-group-text"
                    id="addon-wrapping"
                >
                    <i className="fa-solid fa-lock"></i>
                </span>
                <input
                    value={dataForm.password}
                    type="password"
                    name="password"
                    onChange={handleChangeInput}
                    style={{ height: '35px', zIndex: 0 }}
                    className="form-control"
                    placeholder={t('Register.placeholder_password')}
                />
            </div>
            <div className="input-group flex-nowrap mt-2" style={{ paddingRight: '10px' }}>
                <span
                    style={{
                        padding: '0 0 0 10px',
                        width: '40px',
                        background: '#f5f5f5',
                    }}
                    className="input-group-text"
                    id="addon-wrapping"
                >
                    <i className="fa-solid fa-check"></i>
                </span>
                <input
                    value={dataForm.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    onChange={handleChangeInput}
                    style={{ height: '35px' }}
                    className="form-control"
                    placeholder={t('Register.placeholder_repassword')}
                />
            </div>
            <button
                    disabled={dataForm.username.length < 3 || dataForm.password.length < 0 || dataForm.confirmPassword.length < 0 || phone.length < 3}
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
                </button>
        </div>
    );
}
