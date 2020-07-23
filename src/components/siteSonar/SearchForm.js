import React, { useState } from "react";

import SearchBox from "./SearchBox.js";
import ResultBox from "./resultBox";

const SearchForm = () => {

    const [Result, setSearchResult] = useState({
        ShowResult:false,
        SearchResults: {}
      })

    const storeSearchResults = (SearchResults) => {
        console.log("received");
        console.log(SearchResults);
        setSearchResult({
            ShowResult:true,
            SearchResults: SearchResults
        })
    }

    
    return ( 
    <div>
        { <SearchBox storeSearchResults = { storeSearchResults } style={{margin: '10px'}}></SearchBox> }
        <ResultBox searchData = {Result.SearchResults} showResult = {Result.ShowResult}></ResultBox>
    </div>
    );
    
}



export default SearchForm;