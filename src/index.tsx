import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.scss';
import App from 'views/App/App';
import './utils/store_songs_to_localstorage';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
