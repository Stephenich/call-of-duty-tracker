import { Formik, Field, Form } from 'formik';
import styles from './styles/form.module.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const cookies = new Cookies();

const LoginForm = () => {
  const router = useRouter();
  if (cookies.get('token')) {
    router.push('/dashboard');
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Login</h1>
      </header>
      <Formik
        initialValues={{ email: '', password: '' }}
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
          <Form className={styles.form}>
            <div className={styles.input}>
              <Field name="email" type="email" placeholder="Email" className={styles.email} />
              <Field name="password" type="password" placeholder="Password" className={styles.password} />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.button}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
