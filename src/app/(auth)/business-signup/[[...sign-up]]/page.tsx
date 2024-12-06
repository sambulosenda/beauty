import { SignUp } from "@clerk/nextjs";

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
        initialValues={{
          role: "PROVIDER"
        }}
      />
    </div>
  );
} 
