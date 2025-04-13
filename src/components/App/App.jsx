import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Route, Routes } from 'react-router-dom';
import Section from '../Section/Section';
import Container from '../Container/Container';
import Loader from '../Loader/Loader';
import RestrictedRoute from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage')
);

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Section>
      <Container>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/register"
              element={
                <RestrictedRoute
                  component={<RegisterPage />}
                  redirectTo="/contacts"
                />
              }
            />

            <Route
              path="/login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />

            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/" component={<ContactsPage />} />
              }
            />
          </Routes>
        </Layout>

        <Toaster position="top-center" toastOptions={{ duration: 6000 }} />
      </Container>
    </Section>
  );
}

export default App;

// username - Heisenberg
// email - vlad.rzaev@gmail.com
// password - bxwb8w&WGDWDjw097_)&

// username - Vlad
// email - rzaev.vlad@gmail.com
// password - cw87dw87gwc!(&)
