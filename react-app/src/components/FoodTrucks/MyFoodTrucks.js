import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMyFoodTrucksThunk } from '../../store/foodTrucks';
import MyFoodTruckCard from './MyFoodTruckCard';
import NewFoodTruckModal from './NewFoodTruckModal';
import './MyFoodTrucks.css';
import './NewFoodTruckForm.css';
import './MyFoodTruckCard.css';


const MyFoodTruckListing = () => {
    const dispatch = useDispatch();
    const myFoodTrucksObj = useSelector(state => state.foodTrucks.entities);
    const sessionUser = useSelector(state => state.session.user)
    const foodTrucks = Object.values(myFoodTrucksObj).filter(foodTruck => +foodTruck.ownerId === +sessionUser.id).sort((a, b) => {
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)
        return (bDate - aDate)
    })

    useEffect(() => {
        dispatch(getMyFoodTrucksThunk())
    }, [dispatch])

    return (
        <div className='my-food-trucks-container'>
            <NewFoodTruckModal />
            {foodTrucks.map((foodTruck) => (
                <div className='my-food-trucks-card-container'>
                    <NavLink className={'my-food-trucks-card-link'} to={`/food-trucks/${foodTruck.id}`}>
                        <MyFoodTruckCard key={foodTruck.id} foodTruck={foodTruck} />
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MyFoodTruckListing;
