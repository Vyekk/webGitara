import ReactDOM from 'react-dom/client';
import 'index.scss';
import App from 'views/App/App';

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
} else {
    throw new Error('Root element not found');
}
