import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Routes";
import "./App.css";
import BackgroundDegrade from "./components/ui/BackgroundDegrade";

function App() {
  return (
    <div>
      <BackgroundDegrade>
        <Header />
        <main style={{ minHeight: "80vh" }}>
          <AppRoutes />
        </main>
        <Footer />
      </BackgroundDegrade>
    </div>
  );
}

export default App;
