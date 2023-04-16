import Login from './LoginComponent'
import Welcome from './WelcomeComponent'
import Error from './ErrorComponent'
import ListTodos from './ListTodosComponent'
import Header from './HeaderComponent';
import Footer from './Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContextProvider from './security/AuthContext'
import { useAuth } from './security/AuthContext'
import Todo from './TodoComponent'
import HomeComponent from './Home'
import RegisterComponent from './Register';

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function ToDoApp() {
    return (
        <div className="ToDoApp">
            <AuthContextProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <Welcome />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodos />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <Todo />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthContextProvider>

            
        </div>
    )
}

