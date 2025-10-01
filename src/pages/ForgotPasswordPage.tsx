import React from 'react';
import SEO from '../components/seo/SEO';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Forgot Password"
        description="Reset your ShikkhaPro account password. Enter your email to receive password reset instructions."
        keywords="forgot password, reset password, ShikkhaPro account recovery"
        noIndex={true}
      />
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;