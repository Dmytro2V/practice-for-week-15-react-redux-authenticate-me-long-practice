import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/session'
import { Redirect } from 'react-router-dom';
import './signupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) return (
    <Redirect to="/" />
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      username,
      email,
      password
    }
    if (password === confirmPassword) {
      
      return dispatch(signup(user))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    } else {
      return setErrors(['Passwords are different'])
    }
  };

  return (
    <>
      <h2>Signup Form</h2>
      <form onSubmit={onSubmit}>
        <div className='container'>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <b>Username:</b>
          <input
            type='text'
            value={username}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
            //name = 'credential'
            required
          />
        </label>
        <label>
          <b>Email:</b>
          <input
            type='text'
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            //name = 'credential'
            required
          />
        </label>
        
        <label>
          <b>Password:</b>
          <input
            type='password'
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            //name = 'password'
            required
          />
        </label>
        <label>
          <b>Confirm password:</b>
          <input
            type='password'
            value={confirmPassword}
            placeholder='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            //name = 'password'
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  )

}

export default SignupFormPage;