import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import SEO from '../components/seo/SEO';

const RegisterPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Sign Up"
        description="Create your free ShikkhaPro account and start generating AI-powered quizzes. Join thousands of students improving their learning experience."
        keywords="sign up, register, create account, join ShikkhaPro, student registration"
        noIndex={true}
      />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;