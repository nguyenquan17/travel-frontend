import React from 'react';
import Landing from './Landing';
import Intro from  "./Intro";
import SearchBar from  "./SearchBar";
import ViewList from "./ViewList"
function Home() {
    
    return (
        <Landing>
            <Intro/>
            <SearchBar />
            <ViewList />
        </Landing>
    );
}

export default Home;