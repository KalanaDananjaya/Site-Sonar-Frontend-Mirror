import React, { useState } from "react";

import SearchBox from "./SearchBox.js";
import ResultBox from "./ResultBox";
import LastRunDiv from "components/siteSonar/LastRunData.js"

const SearchForm = () => {

    const [Result, setSearchResult] = useState({
        ShowResult:false,
        SearchResults: {}
      });


    const [RunState, setRunState] = useState({
        'all_runs': 'Loading',
        'selected_run': 'Loading'
    });

    

    const [RunIdValue, setRunIdValue] = useState("0");

    const handleRunSelection = (run_id) => {
        setRunIdValue(run_id);
        for (const [idx,element] in RunState.all_runs.entries()) {
            if (run_id === element.run_id){
                
            }
        }
    }

    const handleRunSubmit = () => {
       
        //change selected run to this
    }

    const storeSearchResults = (SearchResults) => {
        console.log("received");
        console.log(SearchResults);
        setSearchResult({
            ShowResult:true,
            SearchResults: SearchResults
        });
    }

    const handleRunChange = (data) => {
        setRunState(data);
        console.log('run state is', RunState);
    }

    
    return ( 
    <div>
        <LastRunDiv RunState = { RunState } handleRunChange = { handleRunChange } handleRunSelection = { handleRunSelection }></LastRunDiv>
        <SearchBox storeSearchResults = { storeSearchResults } style={{margin: '10px'}}></SearchBox> 
        <ResultBox searchData = { Result.SearchResults } showResult = { Result.ShowResult } ></ResultBox>
    </div>
    );
    
}



export default SearchForm;