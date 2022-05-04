import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();
// This is going to create our context

// Creating the context component


export const RestaurantsContextProvider = props => {
// Initialising the state of restaurant data as an empty array
    const [restaurants, setRestaurants] = useState([]);
// So that the page auto updates to show the newly added restaurant we have to create a add restaurant function in the context
    const addRestaurants = (restaurant) => {
        // Using the spread operator to collect all the data stored in the restaurants array in the useState above, into the new function parameter restaurant
    setRestaurants([...restaurants, restaurant]);
}

    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
            {/* passing down setRestaurants so that the components can update their state */}
            {/* passing the value of restaurants down to every component */}
            {/* We pass down the addrestaurant function to all the components so we can let them addrestaurants. */}
           {props.children} 
        </RestaurantsContext.Provider>
    )
}