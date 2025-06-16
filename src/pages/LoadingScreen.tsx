
import { useParams, Navigate } from "react-router-dom";
import CyberpunkLoader from "@/components/loading-screens/CyberpunkLoader";
import NatureLoader from "@/components/loading-screens/NatureLoader";
import MinimalLoader from "@/components/loading-screens/MinimalLoader";
import RetroLoader from "@/components/loading-screens/RetroLoader";
import SciFiLoader from "@/components/loading-screens/SciFiLoader";
import OceanicLoader from "@/components/loading-screens/OceanicLoader";

const loadingScreenComponents = {
  cyberpunk: CyberpunkLoader,
  nature: NatureLoader,
  minimal: MinimalLoader,
  retro: RetroLoader,
  scifi: SciFiLoader,
  oceanic: OceanicLoader,
};

const LoadingScreen = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !loadingScreenComponents[id as keyof typeof loadingScreenComponents]) {
    return <Navigate to="/" replace />;
  }

  const LoadingComponent = loadingScreenComponents[id as keyof typeof loadingScreenComponents];
  
  return <LoadingComponent />;
};

export default LoadingScreen;
