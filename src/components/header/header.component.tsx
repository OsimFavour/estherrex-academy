import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { signOutUser } from "@/services/firebase";
import { auth } from "@/lib/firebase";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const closeMenu = () => setIsOpen(false);

  const handleLogoutClick = () => {
    signOutUser();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Esther's Wisdom Academy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/courses" className="text-sm font-medium transition-colors hover:text-primary">
            Courses
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/academy-register">
            <Button variant="outline" className="hidden md:flex">Register</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle className="text-primary">Menu</SheetTitle>
            </SheetHeader>
            <div className="py-6 px-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-base font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className="text-base font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="text-base font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-base font-medium transition-colors hover:text-primary"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <div className="pt-4 space-y-3">
                <Link to="/signup" onClick={closeMenu}>
                  <Button variant="outline" className="w-full my-0">Sign Up</Button>
                </Link>
                <Link to="/academy-register" onClick={closeMenu}>
                  <Button variant="outline" className="w-full my-2">Register</Button>
                </Link>

                {
                  auth.currentUser ? (
                    <Link to="/login" onClick={closeMenu}>
                  <Button className="w-full">Login</Button>
                </Link>
                  ) : (
                    <Link to="/login" onClick={handleLogoutClick}>
                  <Button className="w-full">Login</Button>
                </Link>
                  )
                }
                
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
