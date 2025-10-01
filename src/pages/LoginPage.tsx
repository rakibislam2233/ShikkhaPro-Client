import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import SEO from '../components/seo/SEO';

const LoginPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Login"
        description="Log in to your ShikkhaPro account to access AI-powered quiz generation and personalized learning tools."
        keywords="login, sign in, ShikkhaPro login, student login"
        noIndex={true}
      />
      <LoginForm />
    </>
  );
};

export default LoginPage;