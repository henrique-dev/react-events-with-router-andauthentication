import { Form, Link, useActionData, useSearchParams, useNavigation } from 'react-router-dom';

import styles from './AuthForm.module.css';

const AuthForm = () => {
  const authData = useActionData();
  const navigation = useNavigation();

  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post" className={styles.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {authData && authData.errors && <ul>
          {Object.keys(authData.errors).map(err => <li key={err}>{err}</li> )}
        </ul> }
        {authData && authData.message && <p>{authData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={styles.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
