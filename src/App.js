import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Loader } from "react-feather";
import Quotes from "./components/quotes/Quotes";
import FavoriteQuotes from "./components/quotes/FavoriteQuotes";
import Message from "./components/Message";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [favoriteQuotes, setFavoriteQuotes] = useState(JSON.parse(window.localStorage.getItem("favorites")) || []);
  const [messageText, setMessageText] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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
    } catch (e) {
      console.log("Error: ", e);
    }
    setLoading(false);
  }


  useEffect(() => {
    fetchQuotes();
  }, []);

  //save favorite quotes to local storage on change
  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(favoriteQuotes));
  }, [favoriteQuotes]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const addToFavorites = (quoteId) => {
    const selectedQuote = quotes.find(quote => quote.id === quoteId);
    const alreadyFavorite = favoriteQuotes.find(quote => quote.id === quoteId);
    if (alreadyFavorite) {
      removeFromFavorites(quoteId);
    } else {
      if (favoriteQuotes.length < maxFaves) {
        setFavoriteQuotes([...favoriteQuotes, selectedQuote]);
        setMessageText("Added to favorites!");
        setShowMessage(true);
      } else {
        setMessageText("Too many favorites, please delete one first in order to save a new one.")
        setShowMessage(true);
      }
    }
  };

  const removeFromFavorites = (quoteId) => {
    setFavoriteQuotes(favoriteQuotes.filter((quote) => quote.id !== quoteId));
  }

  const removeMessage = () => {
    setShowMessage(false);
  }

  const filteredQuotes = quotes.filter(quote => category === "All" ? true : quote.categories.includes(category));

  return (
    <div className='App'>
      {showMessage && <Message messageText={messageText} removeMessage={removeMessage} />}
      <Header />
      <main>
        <FavoriteQuotes favoriteQuotes={favoriteQuotes} maxFaves={maxFaves} removeFromFavorites={removeFromFavorites} />
        {loading ? <Loader /> : <Quotes quotes={filteredQuotes} categories={categories} category={category} favoriteQuotes={favoriteQuotes} handleCategoryChange={handleCategoryChange} addToFavorites={addToFavorites} />}

      </main>
      <Footer />
    </div>
  );
}
export default App;
