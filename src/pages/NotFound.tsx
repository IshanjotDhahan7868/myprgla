import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found — PRGLA Pergolas";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-heading font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">This page doesn't exist.</p>
        <Link
          to="/"
          className="btn-primary-glow px-6 py-3 rounded-md text-sm font-medium inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
