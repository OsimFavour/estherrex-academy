import { useEnrollment } from "@/contexts/enrollment.context";

export function EnrollmentProgress() {
  const { currentStep } = useEnrollment();
  
  const steps = [
    { number: 1, name: "Registration" },
    { number: 2, name: "Academy Info" },
    { number: 3, name: "Payment" },
    { number: 4, name: "Completed" }
  ];

  const percentage = (currentStep / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="progress-step mb-4">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      
      <div className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.number}
            className={`text-xs sm:text-sm flex flex-col items-center ${
              step.number <= currentStep ? "text-academy-primary" : "text-gray-400"
            }`}
          >
            <div 
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 ${
                step.number <= currentStep 
                  ? "bg-academy-primary text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <span className="hidden sm:block">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
