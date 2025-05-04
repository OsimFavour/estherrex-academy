import * as Yup from "yup";

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});



export const academyInfoSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),
  maritalStatus: Yup.string()
    .oneOf(
      ["Single", "Married", "Divorced", "Widow/Widower"],
      "Invalid marital status"
    )
    .required("Marital status is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number must be valid")
    .required("Phone number is required"),
  ageBracket: Yup.string().required("Age bracket is required"),
  churchMinistry: Yup.string(),
  business: Yup.string(),
  mentors: Yup.string(),
  selectedCourses: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one course"),
  expectations: Yup.string().required("Expectations field is required"),
  planToUseKnowledge: Yup.string().required("This field is required"),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});
