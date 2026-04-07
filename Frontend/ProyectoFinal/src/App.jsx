import Router from "@/router/Router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Router />
      <Toaster position="top-center" richColors={true} />
    </>
  );
}

export default App;
