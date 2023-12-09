import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTaxi } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Glasgow Taxi Hub</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to='/tests'>Taxi Tests</Link>
            </li>
            <li>
              <Link to='/test'>Take Tests</Link>
            </li>
            <li>
              <Link to='/quiz'>Quizzes</Link>
            </li>
            <li>
              <Link to='/tasks'>Tasks</Link>
            </li>
            <li>
              <Link to='/analytics'>Analytics</Link>
            </li>

            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>

          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link to='/vacancies'>
                <FaTaxi /> Vacancies
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
