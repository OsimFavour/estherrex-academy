import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlutterwavePaymentV2 } from "@/components/FlutterwavePaymentV2";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEnrollmentForm } from "@/hooks/useEnrollmentForm";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { 
    setCurrentStep, 
    userData, 
    setUserData,
    handlePaymentSuccess,
    handlePaymentFailure
  } = useEnrollmentForm();
  
  // Check if user is logged in and has completed personal info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // User is not signed in, redirect to registration
        toast.error("Please complete registration first");
        navigate('/register');
        return;
      }
      
      try {
        // Get user data
        const userDataFromFirestore = await getUserData(user.uid);
        
        if (!userDataFromFirestore || !userDataFromFirestore.fullName) {
          // Personal info not completed
          toast.error("Please complete your personal information first");
          navigate('/personal-info');
          return;
        }
        
        // Set user data in context
        setUserData(userDataFromFirestore);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your information");
        navigate('/personal-info');
      }
    });
    
    // Set current step
    setCurrentStep(3);
    
    // Clean up subscription
    return () => unsubscribe();
  }, [navigate, setCurrentStep, setUserData]);
  
  // Get course price based on selected course
  const getCoursePrice = (courseCode: string): number => {
    const coursePrices: {[key: string]: number} = {
      "web-development": 499,
      "ui-ux": 399,
      "data-science": 599,
      "mobile-dev": 549,
      "cloud": 649
    };
    
    return coursePrices[courseCode] || 499; // Default to 499 if course not found
  };
  
  const coursePrice = getCoursePrice(userData?.course as string);
  
  
  const getCourseName = (courseCode: string): string => {
    const courseNames: {[key: string]: string} = {
      "web-development": "Full Stack Web Development",
      "ui-ux": "UI/UX Design Masterclass",
      "data-science": "Data Science & Analytics",
      "mobile-dev": "Mobile App Development",
      "cloud": "Cloud Computing"
    };
    
    return courseNames[courseCode] || "Selected Course";
  };
  
  const courseName = getCourseName(userData?.course as string);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="enrollment-container">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-academy-secondary">Complete Your Payment</h1>
            <p className="text-gray-600 mt-2">
              Secure payment with Flutterwave
            </p>
          </div>
          
          <EnrollmentProgress />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                <h3 className="text-lg font-semibold mb-4">Your Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{userData?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userData?.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userData?.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="font-medium">{courseName}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{courseName}</p>
                      <p className="text-sm text-gray-500">12-week program</p>
                    </div>
                    <p className="font-medium">NGN {coursePrice.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium">NGN {coursePrice.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <p>Tax (5%)</p>
                    <p className="font-medium">NGN {(coursePrice * 0.05).toLocaleString()}</p>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-2"></div>
                  
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p className="text-academy-primary">NGN {(coursePrice * 1.05).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <FlutterwavePaymentV2 
                amount={coursePrice}
                currency="NGN"
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions or encounter any issues during the payment process, 
                  please don't hesitate to contact our support team.
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> support@techacademy.com
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> +234 800 123 4567
                </p>
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/academy-register")}
                >
                  Back to Academy Registration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
);

}