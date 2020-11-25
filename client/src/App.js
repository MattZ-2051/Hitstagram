import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { setCsrfFunc } from './store/auth';
import Home from './components/Home/Home';
import MyProfile from './components/Profile/MyProfile';
import NavBar from './components/NavBar/NavBar';
import Upload from './components/Upload/Upload';
import EditProfile from './components/Profile/EditProfile';
import SoloPost from './components/SoloPost/SoloPost';
import Profile from './components/Profile/Profile';
import ProfileImgUpload from './components/Upload/ProfileImgUpload';
import ExplorePage from './components/ExplorePage/ExplorePage';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const needLogin = useSelector(state => state.auth.id)
    return (
        <>
            <Route {...rest} render={(props) => (
                needLogin
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )
            } />
        </>
    )
}



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
        <>
            <Switch>
                <Route path='/login' exact={true} component={Login} />
                <Route path='/signup' exact={true} component={Signup} />
                <PrivateRoute path="/" exact={true} component={Home} />
                <PrivateRoute path='/upload' exact={true} component={Upload} />
                <PrivateRoute path='/profile/:id/edit' exact={true} component={EditProfile} />
                <PrivateRoute path='/post/:id' exact={true} component={SoloPost} />
                <PrivateRoute path='/profile/:id' exact={true} component={Profile} />
                <PrivateRoute path='/my/profile/:id' exact={true} component={MyProfile} />
                <PrivateRoute path='/profile/img/:id/upload' exact={true} component={ProfileImgUpload} />
                <PrivateRoute path='/explore' exact={true} component={ExplorePage} />
            </Switch>
        </>
    );
}

export default App;
