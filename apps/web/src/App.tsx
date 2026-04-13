import { useEffect, useState } from "react";
import { ManagerMiniCommand } from "./manager/ManagerMiniCommand";
import { VolunteerOnboarding } from "./volunteer/VolunteerOnboarding";

function isManagerRoute(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path.endsWith("/manager")) return true;
  return new URLSearchParams(window.location.search).get("view") === "manager";
}

export function App() {
  const [managerView, setManagerView] = useState(isManagerRoute);

  useEffect(() => {
    const sync = () => setManagerView(isManagerRoute());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#f4f4f5" }}>
      {managerView ? <ManagerMiniCommand /> : <VolunteerOnboarding />}
    </main>
  );
}
