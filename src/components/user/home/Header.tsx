import { Link, useLocation, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Search, ShoppingCart, User, Menu,  Home, BookOpen, Info, Mail, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { userLogout } from "@/services/authServices";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useAppSelector } from "@/redux/store";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  // const cartCount = useAppSelector((state) => state.cart.cartItems.length);
  const cartCount = 3;
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const response = await userLogout(dispatch);
    if (response.status === 200) {
      navigate("/");
      localStorage.clear();
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/login", { state: { formState: "signup" } });
  };

  const handleSignInClick = () => {
    navigate("/login", { state: { formState: "signIn" } });
  };

  const isActive = (path:string) => location.pathname === path;

  const navigationLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/courses", label: "Courses", icon: BookOpen },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-xl font-bold">E-School</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={`${
                    isActive(link.path)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            {user?.role === "user" && (
              <Link to="/be-instructor">
                <Button
                  variant="ghost"
                  className={`${
                    isActive("/be-instructor")
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Become an Instructor
                </Button>
              </Link>
            )}
          </nav>

          {/* Search Bar - Desktop/Tablet */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="pl-10 pr-4 w-full rounded-full border-input focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {user && !isAdmin ? (
              <>
                {/* Wishlist - Desktop only */}
                <Link to="/wishlist" className="hidden lg:block">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Cart - Desktop only */}
                <Link to="/cart" className="hidden lg:block">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* User Dropdown - Desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="hidden md:flex">
                    <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-ring transition-all">
                      <AvatarImage src={user.profileImageUrl} alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        to={user.role === "instructor" ? "/instructor/dashboard" : "/user/dashboard"}
                        className="flex items-center cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleCreateAccountClick}
                  className="hidden md:flex"
                >
                  Create Account
                </Button>
                <Button onClick={handleSignInClick}>
                  Sign In
                </Button>
              </>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  {/* Mobile User Info */}
                  {user && !isAdmin && (
                    <div className="flex items-center gap-3 pb-4 border-b mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.profileImageUrl} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {user.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}

                  {/* Mobile Search */}
                  <div className="relative mb-4 md:hidden">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-10 pr-4 w-full"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive(link.path)
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    ))}
                    {user?.role === "user" && (
                      <Link
                        to="/be-instructor"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive("/be-instructor")
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <Briefcase className="h-5 w-5" />
                        Become an Instructor
                      </Link>
                    )}
                  </nav>

                  {/* Mobile User Actions */}
                  {user && !isAdmin && (
                    <div className="mt-auto pt-4 border-t space-y-2">
                      <Link
                        to="/wishlist"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                        Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                        {cartCount > 0 && (
                          <span className="ml-auto bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to={user.role === "instructor" ? "/instructor/dashboard" : "/user/dashboard"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        <User className="h-5 w-5" />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors w-full text-left"
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  )}

                  {/* Mobile Auth Buttons */}
                  {!user && (
                    <div className="mt-auto pt-4 border-t space-y-2">
                      <Button
                        onClick={() => {
                          handleCreateAccountClick();
                          setMobileMenuOpen(false);
                        }}
                        variant="outline"
                        className="w-full"
                      >
                        Create Account
                      </Button>
                      <Button
                        onClick={() => {
                          handleSignInClick();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;