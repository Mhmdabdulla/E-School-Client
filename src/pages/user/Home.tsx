import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/user/home/Header';

export default function Home() {
  return (
    <>
    <Header />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              Learn Without Limits
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Discover thousands of courses from expert instructors. Build skills, earn certificates, and transform your career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button size="lg" className="text-lg">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/auth?mode=instructor">
                <Button size="lg" variant="outline" className="text-lg">
                  Become an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose E-School?</h2>
            <p className="text-muted-foreground">Everything you need to succeed in your learning journey</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from industry professionals with real-world experience
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Comprehensive Content</h3>
                <p className="text-muted-foreground">
                  In-depth courses with video lessons, resources, and projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Active Community</h3>
                <p className="text-muted-foreground">
                  Connect with fellow learners and get support
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your learning journey and achievements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of students already learning on E-School
          </p>
          <Link to="/auth?mode=signup">
            <Button size="lg">Get Started for Free</Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}