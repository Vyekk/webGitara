import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebsiteView from 'views/WebsiteView/WebsiteView';
import LoginView from 'views/LoginView/LoginView';
import PlayView from 'views/PlayView/PlayView';
import ModalProvider from 'components/Modal/ModalProvider';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WebsiteView />}></Route>
                <Route path="/login" element={<LoginView />}></Route>
                <Route
                    path="/play/*"
                    element={
                        <ModalProvider>
                            <PlayView />
                        </ModalProvider>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
