import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface AuthFormProps {
  onLogin?: (
    email: string,
    password: string,
    isAdmin: boolean,
    name?: string,
  ) => void;
  isLoading?: boolean;
  error?: string;
}

const AuthForm = ({
  onLogin = () => {},
  isLoading = false,
  error = "",
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setLocalError("Please fill in all required fields");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (isSignUp && !name) {
      setLocalError("Please enter your name");
      return;
    }

    // Clear any local errors
    setLocalError("");

    // Admin credentials check
    if (
      !isSignUp &&
      isAdmin &&
      (email !== "DepedAmba" || password !== "Ambalayat@123")
    ) {
      setLocalError("Invalid admin credentials");
      return;
    }

    // Call the login function passed from parent
    if (isSignUp) {
      // Store user data in localStorage for registration
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", isAdmin ? "admin" : "student");
      localStorage.setItem(
        "username",
        username || name.split(" ")[0].toLowerCase(),
      );

      // Redirect to appropriate dashboard
      if (isAdmin) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/student-dashboard";
      }
    } else {
      // For admin login, check credentials
      if (isAdmin) {
        if (email === "DepedAmba" && password === "Ambalayat@123") {
          localStorage.setItem("userName", "DepedAmba");
          localStorage.setItem("userEmail", "admin@example.com");
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("username", "DepedAmba");
          window.location.href = "/dashboard";
        } else {
          setLocalError("Invalid admin credentials");
          return;
        }
      } else {
        // For student login
        localStorage.setItem("userName", name || email.split("@")[0]);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "student");
        localStorage.setItem("username", email.split("@")[0]);
        localStorage.setItem("studentId", "1"); // Store student ID for lookup
        window.location.href = "/student-dashboard";
      }
    }
  };

  const handleTabChange = (value: string) => {
    setIsAdmin(value === "admin");
    // Reset form when switching tabs
    setEmail("");
    setPassword("");
    setLocalError("");
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setLocalError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background border-red-600 border-2 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp
            ? "Enter your information to create an account"
            : "Enter your credentials to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSignUp && (
          <Tabs
            defaultValue="student"
            className="w-full"
            onValueChange={handleTabChange}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="student"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Admin
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {(error || localError) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || localError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setName(newName);
                    // Suggest username based on first name
                    if (newName && !username) {
                      const firstName = newName.split(" ")[0].toLowerCase();
                      setUsername(firstName);
                    }
                  }}
                  className="border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-400"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">{isAdmin ? "Admin ID" : "Email"}</Label>
            <Input
              id="email"
              type={isAdmin ? "text" : "email"}
              placeholder={isAdmin ? "Enter admin ID" : "Enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-400"
            />
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-red-600 focus:ring-red-600 transition-all duration-300 hover:border-red-400"
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center w-full">
          {isSignUp ? (
            <p className="text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-red-600 hover:text-red-800"
                onClick={toggleSignUp}
              >
                Sign in
              </Button>
            </p>
          ) : (
            <p className="text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-red-600 hover:text-red-800"
                onClick={toggleSignUp}
              >
                Sign up
              </Button>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
