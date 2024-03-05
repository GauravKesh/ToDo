import Footer from './components/Footer';
import Todo from './components/ToDo';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
  return (
    <>
      <div className="bg-gray-900">
        <Todo />
        <Footer/>
        <Analytics/>
        <SpeedInsights/>
      </div>
    </>
  );
}

export default App;
