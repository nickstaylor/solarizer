import React, {useState} from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './Home.css';

const Home = () => {
  const [ name, updateName ] = useState('')
  const [ address, updateAddress ] = useState('')
  const [ city, updateCity] = useState('')
  const [ state, updateState ] = useState('')
  const [ zipCode, updateZipCode] = useState('')
  const [ error, udpateError] = useState('')
  const [ validatedUser, updateValidatedUser] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '' || address === '' || city === '' || (zipCode.length !== 5) || state === '') {
      udpateError('Please fill all Inputs')
    } else {
      udpateError('')
      console.log(createUpdatedUser());
      clearInputs()
      updateValidatedUser(true)
    }
  }

  const createUpdatedUser = () => {
    // const userAddress = address !== '' ? address : null
    // const userCity = city !== '' ? city : null
    // const userState = state !== '' ? state : null
    // const userZipCode = zipCode !== '' ? zipCode : null
  
    // return {
    //   userAddress: userAddress,
    //   userCity: userCity,
    //   userState: userState,
    //   userZipCode: userZipCode,
    // }
    return {name, address, city, state, zipCode}
  }

  const clearInputs = () => {
    updateName('')
    updateAddress('')
    updateCity('')
    updateState('')
    updateZipCode('')
  }

  return (
    <>
    {validatedUser && <Redirect to="/configure"/>}
    <div className="home-container">
      <form className="address-form">
        <p className="error-message">New user?</p>
        <h3 className="form-title">Start Solarizing Now:</h3>
        {error &&
        <p className="error">{error}</p>
        }
        <input
          type="text"
          name="name"
          placeholder="name"
          value={name}
          required
          onChange={e => updateName(e.target.value)}
        />
        <input
            type="text"
            name="address"
            placeholder="street address"
            value={address}
            required
            onChange={e => updateAddress(e.target.value)}
          />
          <input
            type="text"
            name="city"
            placeholder="city"
            value={city}
            required
            onChange={e => updateCity(e.target.value)}
          />
          <input
            type="text"
            name="state"
            placeholder="state (ex: CO)"
            value={state}
            required
            onChange={e => updateState(e.target.value)}
          />
          <input
            type="number"            maxLength= "5"
            name="zipCode"
            placeholder="zip code"
            value={zipCode}
            required
            onChange={e => updateZipCode(e.target.value)}
          />
          <button onClick={(e)=>handleSubmit(e)}>Submit</button>
      </form>
      <section className="ecotip">

      </section>
    </div>
    </>
  );
}

export default Home;
