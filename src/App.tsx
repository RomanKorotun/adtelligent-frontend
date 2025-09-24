import { AppRoutes } from "@routes/appRoutes";
import { useCurrentUser } from "@api/auth";

const App = () => {
  const { isLoading } = useCurrentUser();

  return isLoading ? <div>Refreshing user...</div> : <AppRoutes />;
};

export default App;
