import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

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
  "Strategic Music Ministry",
];

const RegisterPage = () => {

  const [formData, setFormData] = useState({
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
    selectedCourses: [] as string[],
    expectations: "",
    planToUseKnowledge: "",
    agreeToTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseToggle = (course: string) => {
    setFormData((prev) => {
      const currentCourses = [...prev.selectedCourses];
      if (currentCourses.includes(course)) {
        return {
          ...prev,
          selectedCourses: currentCourses.filter((c) => c !== course),
        };
      } else {
        return {
          ...prev,
          selectedCourses: [...currentCourses, course],
        };
      }
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions to register.");
      return;
    }

    // In a real app, you would submit to your backend
    console.log("Form submitted:", formData);

    toast("Registration Submitted", {
      description:
        "Thank you for registering with Esther's Wisdom Academy. We will contact you soon!",
    });
  };

  return (
    <div className="container px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Academy Registration</h1>
          <p className="text-muted-foreground mt-2 px-3">
            Complete the form below to register for upcoming academic sessions
            at Esther's Wisdom Academy.
          </p>
        </div>

        <Card>
          <CardHeader className="text-center mb-2">
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out all required fields to complete your registration.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-8">
                <h3 className="text-lg text-center font-medium">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="studentFirstName" className="block text-center mb-6">First Name *</Label>
                    <Input
                      id="studentFirstName"
                      name="studentFirstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentLastName" className="block text-center mb-6">Last Name *</Label>
                    <Input
                      id="studentLastName"
                      name="studentLastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="block text-center mb-6">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="block text-center mb-6">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              

              <div className="space-y-4">
                <h3 className="text-lg text-center font-medium">Personal Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status *</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) =>
                        handleSelectChange("maritalStatus", value)
                      }
                      required
                    >
                      <SelectTrigger id="maritalStatus">
                        <SelectValue placeholder="Select Marital Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widow">Widow/Widower</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ageBracket">Age Bracket *</Label>
                    <Select
                      value={formData.ageBracket}
                      onValueChange={(value) =>
                        handleSelectChange("ageBracket", value)
                      }
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
                <h3 className="text-lg font-medium text-center mt-6">Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchMinistry" className="block text-center mb-6">Name of Church/Ministry</Label>
                    <Input 
                      id="churchMinistry"
                      name="churchMinistry"
                      value={formData.churchMinistry}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business" className="block text-center mb-6">Name of Business</Label>
                    <Input 
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mentors" className="block text-center mb-6">Mentors</Label>
                  <Input 
                    id="mentors"
                    name="mentors"
                    value={formData.mentors}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-center font-medium">Course(s) of Interest *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {courses.map((course) => (
                    <div key={course} className="flex items-center space-x-2">
                      <Checkbox
                        id={`course-${course}`}
                        checked={formData.selectedCourses.includes(course)}
                        onCheckedChange={() => handleCourseToggle(course)}
                      />
                      <Label htmlFor={`course-${course}`} className="text-sm">
                        {course}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-center font-medium">Additional Information</h3>
                <div className="space-y-2 mt-5">
                  <Label htmlFor="expectations" className="block text-center mb-6">
                    What are your expectations? *
                  </Label>
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
                  <Label htmlFor="planToUseKnowledge" className="block text-center mb-6">
                    What do you intend to do with the knowledge? *
                  </Label>
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
                  I agree to the terms and conditions and privacy policy of
                  Esther's Wisdom Academy.
                </Label>
              </div>

            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full mt-7">
                Submit Registration
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
