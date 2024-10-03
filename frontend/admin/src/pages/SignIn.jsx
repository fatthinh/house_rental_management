import FormInput from './../components/Form/FormInput';
import Form from './../components/Form/Form';
import PageWrapper from './../components/PageWrapper';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import API, { endpoints } from '@/configs/API';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '@/redux/slices/authSlice';
import cookie from 'react-cookies';
import { authSelector } from '@/redux/selectors';

const SignIn = () => {
    const [form, setForm] = useState({
        email: 'pthinh.lama@gmail.com',
        password: 'lpthinh',
    });
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(authSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    const isValidForm = () => {
        const form = document.getElementsByClassName('login-form')[0];
        return form.checkValidity();
    };

    const handleSignIn = async () => {
        if (isValidForm()) {
            try {
                const res = await API.post('/identity/auth/token', form);
                console.log(res);
                if (res.status == 200) {
                    dispatch(authSlice.actions.signIn(res.data));
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex-1 h-screen justify-center items-center flex">
            <PageWrapper className="max-w-[50%]">
                <div className="flex flex-col items-center mb-6 py-4">
                    <h3 className="tracking-widest text-3xl font-bold text-primary-500">seventee</h3>
                    <h4 className="mt-4">Quản trị viên</h4>
                </div>
                <Form
                    className="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FormInput
                        value={form.email}
                        setValue={(value) =>
                            setForm((prev) => {
                                return {
                                    ...prev,
                                    email: value,
                                };
                            })
                        }
                        name="email"
                        label="Email"
                    />
                    <FormInput
                        value={form.password}
                        setValue={(value) =>
                            setForm((prev) => {
                                return {
                                    ...prev,
                                    password: value,
                                };
                            })
                        }
                        name="password"
                        label="Mật khẩu"
                        type="password"
                    />

                    <div>
                        <Button
                            text="Đăng nhập"
                            className="bg-primary-300 px-6 w-full text-md font-bold text-white"
                            type="submit"
                            loading
                            onClick={handleSignIn}
                        />
                    </div>
                </Form>
            </PageWrapper>
        </div>
    );
};

export default SignIn;
