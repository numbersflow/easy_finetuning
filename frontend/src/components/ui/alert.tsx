import * as React from "react"

const variantStyles = {
  default: "bg-gray-100 text-gray-900",
  destructive: "bg-red-100 text-red-900",
  warning: "bg-yellow-100 text-yellow-900",
  info: "bg-blue-100 text-blue-900",
}

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`rounded-lg border p-4 ${variantStyles[variant]} ${className}`}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }