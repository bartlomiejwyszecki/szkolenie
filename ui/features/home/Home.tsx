import { APP_CONFIG } from "components/config/app";

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Welcome to {APP_CONFIG.name}</h1>
      <p className="text-lg">
        This is the home page of our application. Feel free to explore!
      </p>
    </div>
  );
}; 