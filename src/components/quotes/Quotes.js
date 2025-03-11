import React from "react";
import QuoteCard from "./QuoteCard";
import CategoryForm from "./CategoryForm";

function Quotes({ quotes, category, categories, favoriteQuotes, handleCategoryChange, addToFavorites }) {

    const paragraphText = `You have ${quotes.length} great ${category === "All" ? "" : category} ${quotes.length === 1 ? "quote" : "quotes"}!`;

    return (
        <section className="all-quotes">
            <div className="quotes wrapper">
                <div className="category-header">
                    <h2>Pick your Favorite Quotes Below</h2>
                    <p>{paragraphText}</p>
                    <CategoryForm categories={categories} category={category} handleCategoryChange={handleCategoryChange} />
                </div>
                {quotes.map((quote) => <QuoteCard key={quote.id} quote={quote} favoriteQuotes={favoriteQuotes} addToFavorites={addToFavorites} />)}
            </div>
        </section>
    )
}

export default Quotes;