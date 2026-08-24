import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import SocialButton from './SocialButton';

const SocialAuth = ({ activeTab, onGoogleSuccess, onGoogleError, onLinkedInLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // Send the access token to our backend for verification and JWT issuance
        onGoogleSuccess(tokenResponse.access_token);
      } catch (error) {
        console.error("Failed to process Google login", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.log('Google login error', error);
      onGoogleError(error);
    }
  });

  return (
    <div className="mt-6 grid grid-cols-1 gap-3">
      <SocialButton
        provider="google"
        icon={<img src="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="" className="w-5 h-5" />}
        label="Continue with Google"
        onClick={() => handleGoogleLogin()}
        isLoading={isLoading}
      />

      {activeTab === 'candidate' && (
        <SocialButton
          provider="linkedin"
          icon={<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
          label="Continue with LinkedIn"
          onClick={onLinkedInLogin}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default SocialAuth;
