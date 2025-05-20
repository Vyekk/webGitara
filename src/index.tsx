import ReactDOM from 'react-dom/client';
import 'index.scss';
import App from 'views/App/App';
import './utils/store_songs_to_localstorage';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
} else {
    throw new Error('Root element not found');
}
