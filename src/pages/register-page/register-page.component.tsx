
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
// import { toast } from "@/components/ui/sonner";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    dateOfBirth: "",
    gender: "",
    gradeLevel: "",
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    
    toast("Registration Submitted",{
      description: "Thank you for registering with Esther's Wisdom Academy. We will contact you soon!",
    });
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Student Registration</h1>
          <p className="text-muted-foreground mt-2 px-3">
            Complete the form below to register for upcoming academic sessions at Esther's Wisdom Academy.
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
                <h3 className="text-lg font-medium">Student Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentFirstName">First Name *</Label>
                    <Input 
                      id="studentFirstName"
                      name="studentFirstName"
                      required
                      value={formData.studentFirstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentLastName">Last Name *</Label>
                    <Input 
                      id="studentLastName"
                      name="studentLastName"
                      required
                      value={formData.studentLastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input 
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      required
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeLevel">Grade Level *</Label>
                  <Select
                    value={formData.gradeLevel}
                    onValueChange={(value) => handleSelectChange("gradeLevel", value)}
                    required
                  >
                    <SelectTrigger id="gradeLevel">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="grade-1">Grade 1</SelectItem>
                      <SelectItem value="grade-2">Grade 2</SelectItem>
                      <SelectItem value="grade-3">Grade 3</SelectItem>
                      <SelectItem value="grade-4">Grade 4</SelectItem>
                      <SelectItem value="grade-5">Grade 5</SelectItem>
                      <SelectItem value="grade-6">Grade 6</SelectItem>
                      <SelectItem value="grade-7">Grade 7</SelectItem>
                      <SelectItem value="grade-8">Grade 8</SelectItem>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parent/Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentFirstName">First Name *</Label>
                    <Input 
                      id="parentFirstName"
                      name="parentFirstName"
                      required
                      value={formData.parentFirstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentLastName">Last Name *</Label>
                    <Input 
                      id="parentLastName"
                      name="parentLastName"
                      required
                      value={formData.parentLastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address *</Label>
                  <Input 
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact Name *</Label>
                    <Input 
                      id="emergencyContact"
                      name="emergencyContact"
                      required
                      value={formData.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                    <Input 
                      id="emergencyPhone"
                      name="emergencyPhone"
                      type="tel"
                      required
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pb-2">
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
              <Button type="submit" className="w-full">Submit Registration</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
