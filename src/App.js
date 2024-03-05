import Footer from './components/Footer';
import Todo from './components/ToDo';
import { Analytics } from "@vercel/analytics/react";


function App() {
  return (
    <>
      <div className="bg-gray-900">
        <Todo />
        <Footer/>
        <Analytics/>
      </div>
    </>
  );
}

export default App;
