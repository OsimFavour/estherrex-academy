import { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import {
  recordPayment,
  registerUser,
  updateUserData,
  UserData,
} from "@/services/firebase";
import { authenticateWithGooglePopup, createUserDocumentFromAuth } from "@/utils/firebase/firebase.utils";

type RegistrationValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AcademyInfoValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  maritalStatus: string;
  ageBracket: string;
  churchMinistry: string;
  business: string;
  mentors: string;
  selectedCourses: string[];
  expectations: string;
  planToUseKnowledge: string;
  agreeToTerms: boolean;
};

export function useEnrollmentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<Partial<UserData>>({});

  const from = location.state?.from || '/'; 


  const registrationForm = useFormik<RegistrationValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (
      values,
      { setSubmitting }: FormikHelpers<RegistrationValues>
    ) => {
      setIsSubmitting(true);

      try {
        await registerUser(values.email, values.password);

        setUserData({ email: values.email });
        setCurrentStep(2);
       
        toast.success("Registration successful!");

        navigate("/academy-info");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Registration error:", error);
          toast.error(
            `Registration failed: ${error.message || "Please try again"}`
          );
        }
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });


  const AcademyInfoForm = useFormik<AcademyInfoValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      maritalStatus: "",
      ageBracket: "",
      churchMinistry: "",
      business: "",
      mentors: "",
      selectedCourses: [],
      expectations: "",
      planToUseKnowledge: "",
      agreeToTerms: false,
    },

    onSubmit: async (
      values,
      { setSubmitting }: FormikHelpers<AcademyInfoValues>
    ) => {
      setIsSubmitting(true);

      try {
        if (!auth.currentUser) {
          throw new Error("You must be logged in to continue");
        }

        await updateUserData(auth.currentUser.uid, values);

        setUserData((prev) => ({ ...prev, ...values }));
        setCurrentStep(3);

        toast.success("Academy information saved!");

        navigate("/payment");
      } catch (error: unknown) {
        if (error instanceof Error ) {

          console.error("Academy info submission error:", error);
          toast.error(
            `Failed to save information: ${error.message || "Please try again"}`
          );
        }
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

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

 
  const handlePaymentSuccess = async (transactionId: string) => {
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to complete payment");
      }

   
      await recordPayment(auth.currentUser.uid, "completed", transactionId);


      setUserData((prev) => ({
        ...prev,
        paymentStatus: "completed",
        transactionReference: transactionId,
      }));

      setCurrentStep(4);

      toast.success("Payment successful!");

      navigate("/success");
    } catch (error: unknown) {
      if (error instanceof Error) {

        console.error("Payment recording error:", error);
        toast.error(`Failed to record payment: ${error.message}`);
      }
    }
  };

 
  const handlePaymentFailure = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error("You must be logged in to complete payment");
      }

      await recordPayment(auth.currentUser.uid, "failed");

      setUserData((prev) => ({ ...prev, paymentStatus: "failed" }));

   
      toast.error("Payment failed. Please try again.");
    } catch (error: unknown) {
      if (error instanceof Error) {

        console.error("Payment recording error:", error);
        toast.error(`Failed to record payment status: ${error.message}`);
      }
    }
  };

  return {
    currentStep,
    setCurrentStep,
    userData,
    setUserData,
    isSubmitting,
    registrationForm,
    AcademyInfoForm,
    authenticateWithGoogle,
    handlePaymentSuccess,
    handlePaymentFailure,
  };
}
