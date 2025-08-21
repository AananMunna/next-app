export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      {/* Animated logo with phone icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-primary-foreground" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </div>
        
        {/* Outer spinning ring */}
        <div className="absolute -inset-4 border-4 border-primary/20 rounded-full animate-ping"></div>
        
        {/* Main spinner */}
        <div className="absolute -ins-4">
          <div className="w-24 h-24 border-4 border-transparent rounded-full 
                          border-t-primary border-r-accent animate-spin" 
               style={{ animationDuration: '1.5s' }}>
          </div>
        </div>
      </div>
      
      {/* Loading text with subtle animation */}
      <div className="text-center">
        <p className="text-primary font-semibold text-lg mb-2">PhoneHub</p>
        <div className="flex justify-center space-x-1">
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