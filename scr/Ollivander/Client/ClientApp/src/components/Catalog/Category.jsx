import { useState } from "react";


const Category = ({ categories, setCategory, current }) => {

    const [currentCategory, setCurrentCategory] = useState((current === null || current === 0 || typeof current === 'undefined') ? 1 : current)

    const click = (e) => {

        setCurrentCategory(Number(e.target.getAttribute("data-index")) + 1)
        setCategory(e.currentTarget.textContent);
    }

    return (
        <>
            {
                categories.length !== 0 &&
                    <ul className="categories">
                        {
                            categories.map((category, index) =>

                                (index === currentCategory - 1)
                                    ? <li key={index} className="category-item category-item-active">{category}</li>
                                    : <li onClick={click} key={index} data-index={index} className="category-item">{category}</li>
                            )
                        }
                    </ul>
            }
        </>
    );
}
export default Category;