import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap } from 'lucide-react';
import Header from '@/components/user/home/Header';
import LoginForm from '@/components/user/auth/login-form';
import SignupForm from '@/components/user/auth/signup-form';
import ResetPasswordDialog from '@/components/user/auth/reset-password-dialog';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';

export default function Auth() {
  const location = useLocation()
  const mode = location.state?.formState || "login";
  const [loading, setLoading] = useState<boolean>(true)
  const isAdmin = localStorage.getItem("adminLoggedIn")
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

    useEffect(() => {
    if (user && !isAdmin) {
      navigate("/")
    } else {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <div></div>
  }

  return (
    <>
    <div className="min-h-screen ">
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <GraduationCap className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="text-center">
              <CardTitle className="text-2xl">Welcome to E-School</CardTitle>
              <CardDescription>
                {mode === 'login' ? 'Login to your account' : 'Create a new account'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={mode} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <ResetPasswordDialog />
      </div>
    </>
  );
}