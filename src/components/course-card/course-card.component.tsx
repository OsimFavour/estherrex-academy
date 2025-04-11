import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CourseCardProps =  {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  enrollmentStatus?: "Open" | "Closed" | "Coming Soon";
}

const CourseCard = ({ id, title, description, level, duration, enrollmentStatus = "Coming Soon" }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted flex items-center justify-center">
        <span className="text-xl font-medium text-muted-foreground">Course Image</span>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={
            enrollmentStatus === "Open" ? "default" : 
            enrollmentStatus === "Closed" ? "destructive" : "outline"
          }>
            {enrollmentStatus}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Level</p>
            <p className="text-muted-foreground">{level}</p>
          </div>
          <div>
            <p className="font-medium">Duration</p>
            <p className="text-muted-foreground">{duration}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <Button variant="outline" asChild>
            <Link to={`/course/${id}`}>Learn More</Link>
          </Button>
          <Button disabled={enrollmentStatus !== "Open"}>
            {enrollmentStatus === "Open" ? "Enroll Now" : "Coming Soon"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
