import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  ShoppingBag, 
  Award, 
  Settings 
} from "lucide-react";

const tabs = [
  { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { value: "courses", label: "Courses", icon: BookOpen },
  { value: "instructors", label: "Instructor", icon: GraduationCap },
  { value: "messages", label: "Message", icon: MessageSquare },
  { value: "purchase-history", label: "Purchase History", icon: ShoppingBag },
  { value: "certificates", label: "Certificates", icon: Award },
  { value: "settings", label: "Settings", icon: Settings },
];

const ProfileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setIsMobile] = useState(false);

  // Get last segment of the path
  const currentTab = location.pathname.split("/").pop() || "dashboard";

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTabChange = (value: string) => {
    navigate(`/user/${value}`);
  };

  const currentTabLabel = tabs.find(tab => tab.value === currentTab)?.label || "Dashboard";

  return (
    <div className="w-full mb-8">
      {/* Mobile View - Dropdown */}
      <div className="md:hidden">
        <Select value={currentTab} onValueChange={handleTabChange}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder={currentTabLabel} />
          </SelectTrigger>
          <SelectContent>
            {tabs.map(({ value, label, icon: Icon }) => (
              <SelectItem key={value} value={value} className="text-base py-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tablet View - Scrollable Tabs */}
      <div className="hidden md:block lg:hidden">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="inline-flex w-max min-w-full justify-start border-b bg-transparent p-0">
                {tabs.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex items-center gap-2 whitespace-nowrap rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-primary data-[state=active]:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {/* Scroll indicators */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent" />
          </div>
        </Tabs>
      </div>

      {/* Desktop View - Full Tabs */}
      <div className="hidden lg:block">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Add custom scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProfileNavigation;