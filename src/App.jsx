import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
// import { Chat } from "./Chat"; NEED TO ADD THIS TO BROWSER ROUTER WHEN READY

function App() {
  return (
   <div>
      <BrowserRouter>
        <Header />
        <Content />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
