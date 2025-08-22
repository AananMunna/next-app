import PhoneHubLogo from "@/components/PhoneHubLogo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      {/* Animated logo with phone icon */}
      <div className="relative mb-6">
           <PhoneHubLogo/>
        
        {/* Outer spinning ring */}
        <div className="absolute -inset-4 border-4 border-primary/20 rounded-full animate-ping"></div>
        
        {/* Main spinner */}
        {/* <div className="absolute -ins-4">
          <div className="w-24 h-24 border-4 border-transparent rounded-full 
                          border-t-primary border-r-accent animate-spin" 
               style={{ animationDuration: '1.5s' }}>
          </div>
        </div> */}
      </div>
      
      {/* Loading text with subtle animation */}
      <div className="text-center">
        {/* <p className="text-primary font-semibold text-lg mb-2">PhoneHub</p> */}
        <div className="flex justify-center space-x-1 mt-2">
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0s' }}>L</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.1s' }}>o</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.2s' }}>a</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.3s' }}>d</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.4s' }}>i</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.5s' }}>n</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.6s' }}>g</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.7s' }}>.</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.8s' }}>.</span>
          <span className="text-muted-foreground font-medium animate-pulse" style={{ animationDelay: '0.9s' }}>.</span>
        </div>
      </div>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent rounded-full blur-xl"></div>
      </div>
    </div>
  );
}