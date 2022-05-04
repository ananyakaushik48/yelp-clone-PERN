import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

function AddRestaurant() {
    // importing the addRestaurant function and destructuring it from the RestaurantsContext api
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")
// default html behaviour is to reload the page so we use event e and preventFe
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // RestaurantFinder is the axios component with the base http url 
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            }) // This above object is the body of the post request
            // Using the context function addRestaurants to add restaurant from the json response body from the database after the new restaurant has been added, essentially updating the LIST displayed on the screen
            addRestaurants(response.data.data.restaurant);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='mb-4'>
        <form action="">
            <div className="form row px-5">
                <div className="col">
                    <input value={name} onChange={(e) => setName(e.target.value)}
                    type="text" className='form-control' placeholder='name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={(e) => setLocation(e.target.value)}
                    type="text" className='form-control' placeholder='location'/>
                </div>
                <div className="col">
                    <select value={priceRange} 
                    onChange={(e) => setPriceRange(e.target.value)}
                    className='form-select mr-sm-2'>
                        <option disabled >Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                    <button onClick={handleSubmit} className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant