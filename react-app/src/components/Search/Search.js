import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import FoodTruckCard from '../FoodTrucks/FoodTruckCard';
// import SearchBar from './SearchBar';
import { searchFoodTrucksThunk } from '../../store/foodTrucks';
import './Search.css';
import './SearchBar.css';

const Search = () => {
    // const params = useParams();
    // const searchItem = params.searchItem;
    const dispatch = useDispatch();
    const [searchItem, setSearchItem] = useState('');
    const [term, setTerm] = useState('')
    // useEffect(() => {
    //     dispatch(searchFoodTrucksThunk(searchItem))
    // }, [])

    const submitSearch = (e) => {
        e.preventDefault();

        setTerm(searchItem)
        // TO DO: add in dispatch search thunk
        dispatch(searchFoodTrucksThunk(searchItem))
        // redirectto results page
        // return <Redirect to='/search' />
        // history.push(`/search=${searchItem}`)
    }

    const foodTrucksObj = useSelector(state => state.foodTrucks.entities);

    // sorting trucks by category matching
    // const foodTrucks = Object.values(foodTrucksObj).filter(foodTruck => {
    //     return (
    //         foodTruck.name.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         foodTruck.city.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         foodTruck.cuisine.toLowerCase().includes(searchItem.toLowerCase()))
    // })

    // sorting trucks by name matching
    const foodTruckNames = Object.values(foodTrucksObj).filter(foodTruck =>
        foodTruck.name.toLowerCase().includes(searchItem.toLowerCase()))

    // // sorting trucks by city matching
    const foodTruckCities = Object.values(foodTrucksObj).filter(foodTruck =>
        foodTruck.city.toLowerCase().includes(searchItem.toLowerCase()))

    // // // sorting trucks by cuisine matching
    const foodTruckCuisines = Object.values(foodTrucksObj).filter(foodTruck =>
        foodTruck.cuisine.toLowerCase().includes(searchItem.toLowerCase()))


    return (
        <div className={'search-container'}>
            <div className={'search-bar-container'}>
                <form className={'search-bar-fill'} onSubmit={submitSearch}>
                    <input
                        placeholder='Search for food trucks by name, city, or cuisine...'
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        className={'search-bar-fill'}>
                    </input>
                    <button type='submit' className={'search-bar-button'}>
                        <i className={'fa-solid fa-magnifying-glass'}></i>
                    </button>
                </form>
            </div>
            <div className={'search-results-container'}>
                {!searchItem ?
                    <div className={'pre-search-container'}>
                        <div className={'pre-search-text'}>Please search for a food truck</div>
                    </div>
                    :
                    <>
                        <div className={'search-results-category'}>
                            <div className={'search-results-title'}>Results By Name</div>
                            {foodTruckNames.length > 0 ?
                                <>
                                    <NameResults foodTruckNames={foodTruckNames} searchItem={searchItem} />
                                </>
                                :
                                <div className={'search-results-none'}>No Food Trucks with a name matching your search.</div>
                            }
                        </div>
                        <div className={'search-results-category'}>
                            <div className={'search-results-title'}>Results By City</div>
                            {foodTruckCities.length > 0 ?
                                <>
                                    <CityResults foodTruckCities={foodTruckCities} searchItem={searchItem} />
                                </>
                                :
                                <div className={'search-results-none'}>No Food Trucks with city matching your search.</div>

                            }
                        </div>
                        <div className={'search-results-category'}>
                            <div className={'search-results-title'}>Results By Cuisine</div>
                            {foodTruckCuisines.length > 0 ?
                                <>
                                    <CuisineResults foodTruckCuisines={foodTruckCuisines} searchItem={searchItem} />
                                </>
                                :
                                <div className={'search-results-none'}>No Food Trucks with a cuisine matching your search.</div>
                            }
                        </div>
                    </>
                }
            </div>

        </div>
    )
}


const NameResults = ({ foodTruckNames, searchItem }) => {
    // const foodTruckNames = Object.values(foodTrucksObj).filter(foodTruck =>
    //     foodTruck.name.toLowerCase().includes(searchItem.toLowerCase()))
    return (
        <>
            {foodTruckNames.map((foodTruck, i) => (
                <div className='food-trucks-card-container' key={i}>
                    <NavLink className={'food-trucks-card-link'} to={`/food-trucks/${foodTruck.id}`}>
                        <FoodTruckCard key={foodTruck.id} foodTruck={foodTruck} />
                    </NavLink>
                </div>
            ))}
        </>
    )
}


const CityResults = ({ foodTruckCities, searchItem }) => {
    // const foodTruckCities = Object.values(foodTrucksObj).filter(foodTruck =>
    //     foodTruck.city.toLowerCase().includes(searchItem.toLowerCase()))

    return (
        <>
            {foodTruckCities.map((foodTruck, i) => (
                <div className='food-trucks-card-container' key={i}>
                    <NavLink className={'food-trucks-card-link'} to={`/food-trucks/${foodTruck.id}`}>
                        <FoodTruckCard key={foodTruck.id} foodTruck={foodTruck} />
                    </NavLink>
                </div>
            ))}
        </>
    )
}

const CuisineResults = ({ foodTruckCuisines, searchItem }) => {
    // const foodTruckCuisines = Object.values(foodTrucksObj).filter(foodTruck =>
    //     foodTruck.cuisine.toLowerCase().includes(searchItem.toLowerCase()))
    return (
        <>
            {/* <div className={'search-result-category'}>
                Food Trucks By Cuisine
            </div> */}
            {foodTruckCuisines.map((foodTruck, i) => (
                <div className='food-trucks-card-container' key={i}>
                    <NavLink className={'food-trucks-card-link'} to={`/food-trucks/${foodTruck.id}`}>
                        <FoodTruckCard key={foodTruck.id} foodTruck={foodTruck} />
                    </NavLink>
                </div>
            ))}
        </>
    )
}

export default Search;
