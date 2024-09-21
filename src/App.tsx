
import FavoritesSection from "./sections/FavoritesSection";
import ItemsSection from "./sections/ItemsSection";
import Banner from "./sections/Banner";
function App() {
 
  return (
    <main className="bg-blue-950 min-h-screen flex-col flex items-center bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-gray-400 via-gray-600 to-blue-800">
      <Banner/>
      <FavoritesSection/>
      <ItemsSection/>
    </main>
  );
}

export default App;
