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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  authenticateWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "@/utils/firebase/firebase.utils";
import { FormikHelpers, useFormik } from "formik";


type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match.");
  //     return;
  //   }

  //   console.log("Signup form submitted:", formData);
  //   toast.success(
  //     "Your account has been created. Welcome to Esther's Wisdom Academy!"
  //   );
  // };

  const onSubmit = async (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
    const { firstName, email, password } = values;

    // const { user } = response;

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (!response || !response.user) {
        toast.error("Google authentication failed. Please try again.");
        return;
      }
      // const { user } = response;

      await createUserDocumentFromAuth(response, { displayName: firstName });
      console.log("Username >>>", firstName);

      actions.resetForm();

      toast.success("Signed up successfully");
      navigate(from);
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: string }).code === "string"
      ) {
        const errCode = (error as { code: string }).code;
    
        if (errCode === "auth/network-request-failed") {
          toast.error("No network connection");
        } else if (errCode === "auth/email-already-in-use") {
          toast.error("Cannot create user, email already in use");
        } else {
          console.log("User creation encountered an error", error);
        }
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unknown error", error);
      }
    }
    
  };

  const authenticateWithGoogle = async () => {
    const response = await authenticateWithGooglePopup();

    if (!response || !response.user) {
      toast.error("Google authentication failed. Please try again.");
      return;
    }

    const { user } = response;

    if (user) {
      toast.info("You already have an account, please sign in.");
      navigate("/sign-in");
    } else {
      await createUserDocumentFromAuth(user);
      toast.success("Welcome back!");
      navigate(from);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit,
  });

  console.log(formik);

  return (
    <div className="container py-12 px-4 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground mt-2">
            Create your Esther's Wisdom Academy account
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              Fill in your details to create your personal account
            </CardDescription>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <div className="space-y-4 mt-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={authenticateWithGoogle}
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
                  Sign up with Google
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 mb-3">
                  <Label htmlFor="firstName" className="block text-center mb-4">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="block text-center mb-4">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-center mb-4">
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
              <div className="space-y-2">
                <Label htmlFor="password" className="block text-center mb-4">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="space-y-2 pb-4">
                <Label
                  htmlFor="confirmPassword"
                  className="block text-center mb-4"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 mt-2">
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Need to register a student?{" "}
                <Link to="/register" className="text-primary hover:underline">
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

export default SignUp;
