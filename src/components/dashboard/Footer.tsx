
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  
  // Only show footer when logged in
  if (!user) return null;
  
  return (
    <footer className="border-t bg-white py-4 px-6">
      <div className="container flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <span>Powered by xAI</span>
        </div>
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f0881a31-7dd8-4ff3-a768-4b2cf35cc2c9.png" 
            alt="AdBlitz Logo" 
            className="h-6"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
