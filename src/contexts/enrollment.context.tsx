import React, { createContext, useContext, useState } from "react";

type EnrollmentData = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  education: string;
  course: string;
  referral: string;
  paymentStatus: "pending" | "completed" | "failed";
  transactionReference?: string;
}

type EnrollmentContextType = {
  enrollmentData: Partial<EnrollmentData>;
  updateEnrollmentData: (data: Partial<EnrollmentData>) => void;
  resetEnrollmentData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [enrollmentData, setEnrollmentData] = useState<Partial<EnrollmentData>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateEnrollmentData = (data: Partial<EnrollmentData>) => {
    setEnrollmentData(prevData => ({ ...prevData, ...data }));
  };

  const resetEnrollmentData = () => {
    setEnrollmentData({});
    setCurrentStep(1);
  };

  return (
    <EnrollmentContext.Provider value={{ 
      enrollmentData, 
      updateEnrollmentData, 
      resetEnrollmentData,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
}
