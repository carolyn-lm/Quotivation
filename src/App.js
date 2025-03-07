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
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  const quotesUrl =
    "https://gist.githubusercontent.com/skillcrush-curriculum/6365d193df80174943f6664c7c6dbadf/raw/1f1e06df2f4fc3c2ef4c30a3a4010149f270c0e0/quotes.js";

  const categories = ["All", "Leadership", "Empathy", "Motivation", "Learning", "Success", "Empowerment"];

  const maxFaves = 3;

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

  const handleCategoryChange = (e) => {
    console.log("handleCategoryChange");
    setCategory(e.target.value);
  }

  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find(quote => quote.id === quoteId);
    const alreadyFavorite = favoriteQuotes.find(quote => quote.id === quoteId);
    if (alreadyFavorite) {
      console.log("Already in favorites");
    } else if (favoriteQuotes.length < maxFaves) {
      setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
      console.log("Added to favorites");
    } else {
      console.log("Too many, please delete one first");
    }
  }

  const filteredQuotes = quotes.filter(quote => category === "All" ? true : quote.categories.includes(category));

  return (
    <div className='App'>
      <Header />
      <main>
        <section className="favorite-quotes">
          <div className="wrapper quotes">
            <h3>Top 3 favorite quotes</h3>
            {favoriteQuotes.length > 0 && JSON.stringify(favoriteQuotes)}
          </div>
          <div className="favorite-quotes-description">
            <p>You can add up to three favorites by selecting from the options below. <br /> Once you choose, they will appear here.</p>
          </div>
        </section>
        {loading ? <Loader /> : <Quotes quotes={filteredQuotes} categories={categories} category={category} handleCategoryChange={handleCategoryChange} addToFavorites={addToFavorites} />}

      </main>
      <Footer />
    </div>
  );
}
export default App;
