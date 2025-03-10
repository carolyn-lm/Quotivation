import React from "react";
import { Heart } from "react-feather";

function QuoteCard({ quote, favoriteQuotes, addToFavorites }) {
    const alreadyFavorite = favoriteQuotes.find((fav) => quote.id === fav.id);
    const faveStyle = alreadyFavorite ? "#333" : "";

    return (
        <article className="quote-card">
            <div>
                <p className="categories">
                    {quote.categories.map(category => <span key={category} className="category">{category}</span>)}
                </p>
                <h3>{quote.text}</h3>
            </div>
            <footer>
                <p className="author">{quote.author}</p>
                <p className="add-favorite" onClick={() => addToFavorites(quote.id)}><Heart style={{ fill: faveStyle }} /></p>
            </footer>
        </article>
    )
}

export default QuoteCard;