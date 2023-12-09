import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard/DashboardPage';
import Login from './pages/Auth/LoginPage';
import Register from './pages/Auth/RegisterPage';
import VacanciesPage from './pages/Business/Vacancies';
import TestsPage from './pages/Business/TestsPage';
import QuizPage from './pages/Business/QuizPage';
import AnalyticPage from './pages/Business/AnalyticPage';
import Test from './pages/Business/TestsPage';
import Tasks from './pages/Business/TasksPage';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/vacancies' element={<VacanciesPage />}/>
            <Route path='/tests' element={<TestsPage />}/>
            <Route path='/quizzes' element={<QuizPage />}/>
            <Route path='/analytics' element={<AnalyticPage />}/>
            <Route path='/tests' element={<Test />}/>
            <Route path='/tasks' element={<Tasks />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
