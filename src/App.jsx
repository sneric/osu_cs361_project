import { createRoot } from "react-dom/client";


const App = () => {
  return (
    <div>
      App is running on local host
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
