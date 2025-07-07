import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebsiteView from 'views/WebsiteView/WebsiteView';
import LoginView from 'views/LoginView/LoginView';
import PlayView from 'views/PlayView/PlayView';
import ModalProvider from 'components/Modal/ModalProvider';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { AuthProvider } from 'context/AuthContext';
import ActivateAccount from 'components/ActivateAccount/ActivateAccount';
import TermsAndPrivacyView from 'views/TermsAndPrivacyView/TermsAndPrivacyView';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<WebsiteView />}></Route>
                    <Route path="/termsandprivacyview" element={<TermsAndPrivacyView />}></Route>
                    <Route path="/login" element={<LoginView />}></Route>
                    <Route path="activate" element={<ActivateAccount />} />
                    <Route element={<PrivateRoute />}>
                        <Route
                            path="/play/*"
                            element={
                                <ModalProvider>
                                    <PlayView />
                                </ModalProvider>
                            }
                        ></Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
