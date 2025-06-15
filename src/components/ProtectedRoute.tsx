import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}>
        <div style={{ position: "relative", width: "180px", height: "180px" }}>
          <DotLottieReact
            src="https://lottie.host/0dd37147-614e-4f55-a708-43db23c5831a/0XHUh8zquF.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              color: "white",
              fontSize: "14px",
              animation: "blink 1.5s infinite",
            }}
          >
            LOADING
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 