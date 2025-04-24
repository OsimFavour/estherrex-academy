import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { getCourseById, registerForCourse } from "@/services/courseService";
import { useAuth } from "@/contexts/AuthContext";

const courses = [
  "Effective Prayer Ministry",
  "Effective Pastoring and Mentoring",
  "Effective Leadership",
  "The Great Commission",
  "Children and Youth Ministry",
  "Marriage Mentoring",
  "Ministerial Help",
  "Ministry of Help",
  "Teaching Ministry/Effective Communication",
  "Healing and Deliverance Ministry",
  "The Creative Writing Ministry",
  "Strategic Music Ministry"
];

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseId = searchParams.get('course');
  
  const [courseDetails, setCourseDetails] = useState({ title: "", id: "" });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    maritalStatus: "",
    ageBracket: "",
    churchMinistry: "",
    business: "",
    mentors: "",
    selectedCourses: [] as string[],
    expectations: "",
    planToUseKnowledge: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (courseId) {
        setLoading(true);
        try {
          const course = await getCourseById(courseId);
          if (course) {
            setCourseDetails({ title: course.title, id: course.id });
            // Pre-select this course
            setFormData(prev => ({
              ...prev,
              selectedCourses: [course.title]
            }));
          }
        } catch (error) {
          console.error("Error fetching course details:", error);
          toast({
            title: "Error",
            description: "Could not load course details",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseToggle = (course: string) => {
    setFormData(prev => {
      const currentCourses = [...prev.selectedCourses];
      if (currentCourses.includes(course)) {
        return {
          ...prev,
          selectedCourses: currentCourses.filter(c => c !== course)
        };
      } else {
        return {
          ...prev,
          selectedCourses: [...currentCourses, course]
        };
      }
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.selectedCourses.length) {
      toast({
        title: "Error",
        description: "Please select at least one course of interest.",
        variant: "destructive",
      });
      return;
    }

    setSubmitLoading(true);
    
    try {
      // In a real app, you would submit to your Firebase backend
      const registrationData = {
        ...formData,
        userId: currentUser?.uid || null,
        registrationDate: new Date(),
      };
      
      const success = await registerForCourse(courseId || 'general', registrationData);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Thank you for registering with Esther's Wisdom Academy. We will contact you soon!",
        });
        // Reset form or redirect
        navigate('/');
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast({
        title: "Registration Failed",
        description: "There was a problem submitting your registration. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Course Registration</h1>
          <p className="text-muted-foreground mt-2">
            {courseDetails.title 
              ? `Complete the form below to register for ${courseDetails.title}.`
              : "Complete the form below to register for upcoming courses at Esther's Wisdom Academy."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to complete your registration.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input 
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Details</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Marital Status *</Label>
                    <RadioGroup 
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleSelectChange("maritalStatus", value)}
                      required
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="single" id="single" />
                        <Label htmlFor="single">Single</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="married" id="married" />
                        <Label htmlFor="married">Married</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="divorced" id="divorced" />
                        <Label htmlFor="divorced">Divorced</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="widow" id="widow" />
                        <Label htmlFor="widow">Widow/Widower</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ageBracket">Age Bracket *</Label>
                    <Select
                      value={formData.ageBracket}
                      onValueChange={(value) => handleSelectChange("ageBracket", value)}
                      required
                    >
                      <SelectTrigger id="ageBracket">
                        <SelectValue placeholder="Select age bracket" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15-25">15 - 25</SelectItem>
                        <SelectItem value="26-35">26 - 35</SelectItem>
                        <SelectItem value="36-45">36 - 45</SelectItem>
                        <SelectItem value="46-55">46 - 55</SelectItem>
                        <SelectItem value="56-65">56 - 65</SelectItem>
                        <SelectItem value="66-75">66 - 75</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchMinistry">Name of Church/Ministry</Label>
                    <Input 
                      id="churchMinistry"
                      name="churchMinistry"
                      value={formData.churchMinistry}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business">Name of Business</Label>
                    <Input 
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentors">Mentors</Label>
                  <Input 
                    id="mentors"
                    name="mentors"
                    value={formData.mentors}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Course(s) of Interest *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <div key={course} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`course-${course}`}
                        checked={formData.selectedCourses.includes(course)}
                        onCheckedChange={() => handleCourseToggle(course)}
                      />
                      <Label htmlFor={`course-${course}`} className="text-sm">{course}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Additional Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="expectations">What are your expectations? *</Label>
                  <Textarea 
                    id="expectations"
                    name="expectations"
                    required
                    rows={3}
                    value={formData.expectations}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="planToUseKnowledge">What do you intend to do with the knowledge? *</Label>
                  <Textarea 
                    id="planToUseKnowledge"
                    name="planToUseKnowledge"
                    required
                    rows={3}
                    value={formData.planToUseKnowledge}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the terms and conditions and privacy policy of Esther's Wisdom Academy.
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitLoading}>
                {submitLoading ? "Submitting..." : "Submit Registration"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
