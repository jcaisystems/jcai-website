// src/components/RecaptchaProvider.tsx
"use client";

import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RecaptchaProvider({ children }: { children: React.ReactNode }) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.warn("reCAPTCHA site key not found. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables. Forms will not be protected.");
    // Return children without provider if key is missing
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}