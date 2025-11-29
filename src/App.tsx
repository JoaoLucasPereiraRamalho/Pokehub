import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Routes";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
