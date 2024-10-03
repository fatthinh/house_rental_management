import { appSelector, authSelector } from '@/redux/selectors';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { privateRoutes, publicRoutes } from './routes';
import { authenticateAsync } from './redux/slices/authSlice';
import { useEffect, useState } from 'react';
import NotificationToast from './components/NotificationToast';
import { useSubscription } from 'react-stomp-hooks';
import appSlice from './redux/slices/appSlice';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated, loading } = useSelector(authSelector);

    if (loading) {
        return <div>loading...</div>;
    }
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/sign-in" />;
};

function App() {
    const { activeMenu, toast } = useSelector(appSelector);
    const dispatch = useDispatch();
    const [newNotification, setNewNotification] = useState();

    useSubscription('/topic/admin', (notification) => {
        setNewNotification(JSON.parse(notification.body));
    });

    useEffect(() => {
        console.log(newNotification['body'])
        dispatch(appSlice.actions.toggleToast({ toastName: 'newNotification' }));
    }, [newNotification]);

    useEffect(() => {
        dispatch(authenticateAsync());
    }, [dispatch]);

    return (
        <Router>
            <div className="flex relative">
                <Routes>
                    {privateRoutes.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={
                                <div className="flex-1">
                                    {activeMenu ? (
                                        <div className="transition-all w-72 fixed sidebar bg-white">
                                            <Sidebar />
                                        </div>
                                    ) : (
                                        <div className="transition-all w-0 fixed sidebar bg-white">
                                            <Sidebar />
                                        </div>
                                    )}
                                    <div className={`bg-neutral-100 ${activeMenu ? 'md:ml-72 w-full-72' : 'flex-2'}`}>
                                        <div className="fixed top-0 md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                                            <Navbar />
                                        </div>
                                        <div>
                                            <PrivateRoute element={item.element} />
                                        </div>
                                    </div>

                                    <NotificationToast
                                        message={newNotification['body']}
                                        title={newNotification['subject']}
                                        time={new Date()}
                                        visible={toast.newNotification}
                                    />
                                </div>
                            }
                        />
                    ))}
                    {publicRoutes.map((item) => (
                        <Route key={item.path} path={item.path} element={<item.element />} />
                    ))}
                    <Route key="notfound" path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
