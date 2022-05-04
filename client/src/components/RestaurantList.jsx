import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
// importing the api to connect to backend

function RestaurantList({ props }) {
  // Destructuring the context from the context provider
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  // Telling the Component to fetch data from the backend server
  useEffect(() => {
    // THIS IS THE FUNCTION WHERE THE USE CONTEXT API POPULATES THE STATE VARIABLES RESTAURANTS AND SETRESTAURANTS
    // useEffect doesnt like it when we return any form of data, in this case the await promise, but it allows us to return a function hence we create the fetch function.
    const fetchData = async () => {
      // empty dependency array means this will run only once when the page loads
      try {
        // RestFinder is an axios instance with a base url already set to the url we need to GET all the restaurants hence the "/"
        const response = await RestaurantFinder.get("/");
        // The restaurants data is inside the response object and is nested in two data objects hence
        setRestaurants(response.data.data.restaurants);
        // All the fetched data has been stored in the Context!!
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    // explicitly calling the function to fetch data
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // in server.js removing the base url only :id is left
      const response = RestaurantFinder.delete(`/${id}`);
      // After we remove the restaurant from the list of restaurants we have to remove it from the restaurants STATE variable array too for the context to update and inturn the UI to update
      // hence we use the setRestaurants function to update that array with the filter function to remove the entry
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id
        // basically returning a check that lets the restaurants whose ID doesnt match the deleted ID to stay in the restaurants array and filter out the one that matches.
      }))
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
          <tr className="bg bg-white">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
            {/* restaurants && restaurants means that if restaurants is not empty then only can you proceed. */}
          {restaurants && restaurants.map((restaurant) => {
            return (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>Reviews</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                </td>
                <td>
                  {/* Here we use an anonymous function in onclick because we need the operation to be carried out only onclick and the
                  and for that to happen we have to pass the handle delete function as a reference to the onclick action  */}
                  <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
          {/* <tr>
            <td className="pt-3">Mcdonalds</td>
            <td className="pt-3">New York</td>
            <td className="pt-3">$$$</td>
            <td className="pt-3">Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
