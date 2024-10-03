import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import App from '@/App.jsx';
import '@/index.css';
import store from '@/redux/store';
import { StompSessionProvider } from 'react-stomp-hooks';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <StompSessionProvider url='http://localhost:8040/websocket'>
            <Provider store={store}>
                <App />
            </Provider>
        </StompSessionProvider>
    </StrictMode>,
);
