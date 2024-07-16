import { useState } from 'react';
import { useEffect } from 'react';
import {BrowserRouter, Routes , Route} from "react-router-dom";
import { fetchDataFromApi } from "./utils/api.js";
import { useSelector, useDispatch } from 'react-redux'

import { getApiConfiguration } from './store/homeSlice';


import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Home from './pages/home/Home.jsx';
import Details from './pages/details/Details.jsx';
import searchResult from './pages/searchResult/searchResult.jsx';
import Explore from './pages/explore/explore.jsx';
import pageNotFound from './pages/404/pageNotFound.jsx';





function App() {

    const dispatch = useDispatch()
  const url=useSelector((state)=>
   state.home)
   console.log(url);

    useEffect(() => {
        fetchApiConfig();
    }, []); // Empty dependency array means the effect runs once after the initial render

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration")
            .then((res) => {
                // console.log("testing");
                console.log(res);

const url ={
              backdrop:res.images.secure_base_url + "original",
              poster:res.images.secure_base_url + "original",
              profile:res.images.secure_base_url + "original",
             }

                dispatch(getApiConfiguration(url));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

   return (
<BrowserRouter>
{/* <Header/> */}
    <Routes>
        <Route  path = "/" element ={<Home/>}/>
        <Route path = "/:mediaType/:id" element={<Details/>}/>
        <Route path = "/search/:query" element= {<searchResult/>}/>
        <Route path="/explore/:mediaType" element = {<Explore/>}/>
        <Route path="*" element = {<pageNotFound/>}/>
    </Routes>
    {/* <Footer/> */}
</BrowserRouter>
    );
}

export default App;


