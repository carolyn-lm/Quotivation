import React from "react";
import { Filter } from "react-feather";

function CategoryForm({ category, categories, handleCategoryChange }) {
    return (
        <div className="category-form">
            <form className="category-filter">
                <Filter />
                <label htmlFor="category">Filter Quotes</label>
                <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                    {categories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </form>
        </div>
    )
}

export default CategoryForm;