import React from 'react'

function RestaurantList() {
  return (
    <div className='list-group p-4'>
        <table className='table table-dark table-hover'>
            <thead>
                <tr className='bg bg-white'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='pt-3'>Mcdonalds</td>
                    <td className='pt-3'>New York</td>
                    <td className='pt-3'>$$$</td>
                    <td className='pt-3'>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList