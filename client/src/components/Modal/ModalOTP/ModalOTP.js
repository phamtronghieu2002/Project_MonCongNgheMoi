import './ModalOTP.scss';
import { useLang } from '../../../hooks';
import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import clsx from 'clsx';

export default function ModalOTP({ onClose, onConfirm, onResendOTP, phoneNumber, onChangePhone }) {
    const [otp, setOtp] = useState('');
    const { t } = useLang();

    const [seconds, setSeconds] = useState(10);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);
        if (seconds === 0) {
            clearInterval(intervalId);
            return;
        }

        return () => clearInterval(intervalId);
    }, [seconds]);
    return (
        <div id="overlay">
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">{t('Login.modal.title')}</h5>
                            {/* <button type="button" className="btn-close" onClick={() => onClose(false)}></button> */}
                        </div>
                        <div className="modal-body">
                            <p>
                                <span> {t('Login.modal.content')}</span> <strong>{phoneNumber}</strong>{' '}
                            </p>
                            <p
                                className="text-primary mt-2"
                                onClick={() => {
                                    onChangePhone();
                                    onClose(false);
                                }}
                            >
                                {t('Login.modal.changePhone')}
                            </p>
                            <div className="wp_otp mt-3">
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>

                            {seconds === 0 ? (
                                <div className="text-end mt-3">
                                    <span className="text-primary" onClick={()=>{
                                        onResendOTP()
                                        setSeconds(10);
                                    }}>
                                        Gửi lại mã
                                    </span>
                                </div>
                            ) : (
                                <p className="text-end mt-3">
                                    Gửi lại mã: <i>({seconds} seconds)</i>
                                </p>
                            )}
                        </div>
                        <div className="modal-footer">
                            {/* <button
                                onClick={() => onClose(false)}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                {t('Login.modal.button.cancel')}
                            </button> */}
                            <button
                                onClick={() => {
                                    onConfirm(otp);
                                }}
                                type="button"
                                className={clsx('btn btn-primary', otp.length < 6 ? 'disabled' : '')}
                            >
                                {t('Login.modal.button.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
