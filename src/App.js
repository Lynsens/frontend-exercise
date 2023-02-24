import React, { useEffect, useState } from "react";
import "./App.css";
import { useForm } from 'react-hook-form';
import axios from 'axios';

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [data, setData] = useState();

  const onSubmit = (userInput) => {
    axios.post('https://frontend-take-home.fetchrewards.com/form',
      userInput)
    .then(function (response) {
      console.log(response);
      if(response.status === 201) {
        alert("Successfully submitted")
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://frontend-take-home.fetchrewards.com/form');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <div className="App">
      <h2>Fetch Frontend Exercise</h2>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-entry">
          <label htmlFor="name">Name</label>
          <input 
              type="text" 
              name="name" 
              aria-describedby="name-desc"
              {...register("name",{
              required: "Please enter your full name",
              pattern: {
                value: /^([\w]{2,})+\s+([\w\s]{2,})+$/i,
                message: "Please enter a valid full name. e.g. Mike Smith"
              }})} />
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        </div>
        <div className="form-entry">
          <label htmlFor="email">Email</label>
          <input 
              type="text" 
              name="email" 
              aria-describedby="email-desc"
              {...register("email",{
              required: "Please enter your email",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Please enter a valid email. e.g. frontend@test.com"
              }})} />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-entry">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            aria-describedby="password-desc"
            {...register("password", {
              required: "Please enter your password",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: `Please enter a password that is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, and one number`
              }
            })}
          />
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
        </div>
        <div className="form-entry">
          <label htmlFor="occupation">Occupation</label>
          <select 
            type="occupation" 
            name="occupation"
            aria-describedby="occupation-desc"
            {...register("occupation",{
              required: "Please select the occupation"})}>
            <option value="">Select...</option>
            {data && data.occupations.map(occupation => <option key={occupation} value={occupation}>{occupation}</option>)}
          </select>
          {errors.occupation && <p className="errorMsg">{errors.occupation.message}</p>}
        </div>
        <div className="form-entry">
          <label htmlFor="state">State</label>
          <select 
            type="state" 
            name="state" 
            aria-describedby="state-desc"
            {...register("state",{
              required: "Please select the state"})}>
            <option value="">Select...</option>
            {data && data.states.map(state => <option key= {state.name} value={state.name}>{state.name}</option>)}
          </select>
          {errors.state && <p className="errorMsg">{errors.state.message}</p>}
        </div>
        <div className="form-entry">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
