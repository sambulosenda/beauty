import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function BusinessSignUpPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none",
          }
        }}
        forceRedirectUrl="/onboarding/business"
        unsafeMetadata={{
          role: "PROVIDER"
        }}
      />
    </div>
  );
}