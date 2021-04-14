import { Formik, Field, Form } from 'formik';
import styles from './styles/login.module.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

export function LoginForm() {
  const router = useRouter();
  if (cookies.get('token')) {
    router.push('/dashboard');
  }
  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: 'stephen-1310@hotmail.com', password: '' }}
        onSubmit={async (values) => {
          const {
            data: { token },
          } = await axios.post('/api/login', {
            username: values.email,
            password: values.password,
          });
          cookies.set('token', token);
          console.log(token);
          router.push('/dashboard');
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" type="email" />
            <Field name="password" type="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
