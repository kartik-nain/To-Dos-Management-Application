import LoginComponent from './Login'
import WelcomeComponent from './Welcome'
import ErrorComponent from './Error'
import ListComponent from './ListTodos'
import HeaderComponent from './Header';
import Footer from './Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContextProvider from './security/AuthContext'
import { useAuth } from './security/AuthContext'
import TodoComponent from './Todo'
import HomeComponent from './Home'
import RegisterComponent from './Register';

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthContextProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>

            
        </div>
    )
}

