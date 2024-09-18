
import Link from "next/link";
import SignupForm from "./components/signup-form";
export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-lg p-8 space-y-8  rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Quiz Master
          </h1>
          <p className="mb-4">Sign up to unlock the World of Mystery Quizes.</p>
        </div>
        <SignupForm />
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
