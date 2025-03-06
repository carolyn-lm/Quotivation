import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import "./App.css";
import Quotes from "./components/quotes/Quotes";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");

  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";

  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const request = await fetch(quotesUrl);
      const results = await request.json();
      setQuotes(results);
      console.log(results);
    } catch (e) {
      console.log("Error: ", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  const filteredQuotes = quotes.filter(quote => category === "All" ? true : quote.categories.includes(category));

  return (
    <div className='App'>
      <Header />
      <main>
        {loading ? <Loader /> : <Quotes quotes={filteredQuotes} categories={categories} category={category} handleCategoryChange={handleCategoryChange} />}

      </main>
      <Footer />
    </div>
  );
}
export default App;
