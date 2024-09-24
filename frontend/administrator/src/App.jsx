import { appSelector } from '@/redux/selectors';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';
import Sidebar from '@/components/Sidebar';
import routes from '@/routes';
import Navbar from '@/components/Navbar';
import { useSelector } from 'react-redux';
import Footer from '@/components/Footer';

function App() {
    const { activeMenu } = useSelector(appSelector);

    return (
        <Router>
            <div className="flex relative">
                {/* Check active menu */}
                {activeMenu ? (
                    <div className="transition-all w-72 fixed sidebar bg-white">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="transition-all w-0 fixed sidebar bg-white">
                        <Sidebar />
                    </div>
                )}
                <div className={`bg-neutral-100 min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
                    {/* Navbar */}
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                        <Navbar />
                    </div>

                    <div >
                        <Routes>
                            {routes.map((item) => (
                                <Route key={item.path} path={item.path} element={<item.element />} />
                            ))}
                            <Route key="notfound" path="*" element={<Navigate to="/" />} />
                        </Routes>

                        {/* Footer */}
                        {/* <Footer /> */}
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
