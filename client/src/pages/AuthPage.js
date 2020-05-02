import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/Auth.Context";

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const message = useMessage();

    const {loading, request, error, clearError} = useHttp();

    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('Data Register', data);
            message(data.message)
        } catch (e) {}
    };


    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            console.log('Data Register', data);
            auth.login(data.token, data.userId)
        } catch (e) {}
    };


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Link modifier</h2>

                <div className="card">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisation</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Type your email"
                                    id="email"
                                    type="text"
                                    className="validate"
                                    name="email"
                                    onChange={changeHandler}
                                    value={form.email}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Type your password"
                                    id="password"
                                    type="password"
                                    className="validate"
                                    name="password"
                                    onChange={changeHandler}
                                    value={form.password}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn green darken-1"
                            style={{marginRight: 15}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>

                        <button
                            className="btn blue-grey"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
