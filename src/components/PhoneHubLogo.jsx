import React from "react";

const PhoneHubLogo = ({ 
  size = "default", 
  variant = "full", 
  className = "" 
}) => {
  // Size classes
  const sizeClasses = {
    sm: "h-6 w-6",
    default: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Logo component with both icon and text
  const Logo = () => (
    <div className={`inline-flex items-center ${className}`}>
      {/* Icon part */}
      <div className={`
        relative flex items-center justify-center rounded-2xl 
        bg-gradient-to-br from-primary to-accent
        ${sizeClasses[size]}
      `}>
        <div className="absolute inset-2 rounded-xl bg-background/90 backdrop-blur-sm"></div>
        <div className="absolute inset-3 rounded-lg bg-primary"></div>
        <div className="absolute h-1 w-1 rounded-full bg-primary-foreground"></div>
        <div className="absolute bottom-1.5 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-sm bg-primary-foreground/70"></div>
      </div>
      
      {/* Text part - only show if variant is 'full' */}
      {variant === "full" && (
        <span className="ml-2 text-xl font-bold tracking-tight text-foreground">
          PhoneMarket
        </span>
      )}
    </div>
  );

  return <Logo />;
};

export default PhoneHubLogo;