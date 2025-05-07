import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { ErrorBoundary } from "./hoc/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
