import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login/Login';
import { setCsrfFunc } from './store/auth';

function App() {

    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const dispatch = useDispatch()

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);

    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);

    return (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path="/" exact={true} />
        </Switch>
    );
}

export default App;
