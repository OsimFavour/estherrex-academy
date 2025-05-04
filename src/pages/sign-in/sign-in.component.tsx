import { FormikHelpers, useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  authenticateWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "@/utils/firebase/firebase.utils";
import { loginSchema } from "@/utils/schemas/schema.utils";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  // const [rememberMe, setRememberMe] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (
      values: SignInFormValues,
      actions: FormikHelpers<SignInFormValues>
    ) => {
      // setIsSigningIn(true);
      try {
        const response = await signInAuthUserWithEmailAndPassword(
          values.email,
          values.password
        );
        if (response) {
          toast("Login Successful", {
            description: "Welcome to Esther's Wisdom Academy portal!",
          });
          actions.resetForm();
          navigate("/");
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/cancelled-popup-request":
              toast.warning(
                "Multiple popup requests canceled. Ensure you're not double-clicking."
              );
              break;
            case "net::ERR_NAME_NOT_RESOLVED":
              toast.warning(
                "Network error. Check your internet connection or DNS settings."
              );
              break;
            default:
              toast.warning("Unexpected error");
          }
        }
      }
    },
  });

  // const handleCheckboxChange = (checked: boolean) => {
  //   setFormData((prev) => ({ ...prev, rememberMe: checked }));
  // };

  const authenticateWithGoogle = async () => {
    console.log("Google login initiated");
    if (isSigningIn) return;
    setIsSigningIn(true);

    try {
      const response = await authenticateWithGooglePopup();
      console.log("This is the response:", response);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Google sign-in failed");
        toast.error("Sign-in failed");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="container py-12 px-4 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Access your Esther's Wisdom Academy account
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <div className="space-y-4 mt-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={authenticateWithGoogle}
                  disabled={isSigningIn}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5">
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>

                  {isSigningIn ? "Signing in..." : "Sign in with Google"}
                </Button>

                <div className="relative mt-8 mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardContent className="space-y-4">
              <div className="space-y-2 mb-6">
                <Label htmlFor="email" className="block text-center mb-6">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Label htmlFor="password" className="block text-center mb-2">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />

                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center space-x-2 pb-3">
                <Checkbox
                  id="rememberMe"
                  // checked={setRememberMe(rememberMe)}
                  // onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="rememberMe" className="text-sm">
                  Remember me for 30 days
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-5">
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Need to register a student?{" "}
                <Link to="/academy-register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
