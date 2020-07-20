import React, { useState } from "react";

import SearchField from "./SearchField.js";
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";

import axios from 'axios';


const SearchBox = () => {
    
  const BackendUrl = `${process.env.REACT_APP_BACKEND_URL}/search_site`;
  const [SiteIdState, setSiteIdState] = useState(0);
  const [EquationState, setEquationState] = useState('')
  const [showResult, setShowResult] = useState({
    showResult:false,
    searchResults: {}
  })
  const handleSiteIdChange = (event) => {
    setSiteIdState(event.target.value);
  }

  const handleEquationChange = (event) => {
    setEquationState(event.target.value);
  }

  const BlankSearchField = { query_key:"", query_value:""};
  const [SearchFieldState, setSearchFieldState] = useState([
    {...BlankSearchField}
  ]);

  const addSearchField = (event) => {
      setSearchFieldState ([...SearchFieldState,{...BlankSearchField}]);
  }

  const handleSearchFieldChange = (event) => {
    const updatedSearchField = [...SearchFieldState];
    updatedSearchField[event.target.dataset.id][event.target.dataset.key] = event.target.value.trim();
    setSearchFieldState(updatedSearchField);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const SearchFormInput = {
      SiteId: SiteIdState.trim(),
      SearchFields : SearchFieldState,
      Equation: EquationState.trim()
    };
    console.log(SearchFormInput);
    console.log(BackendUrl);
    axios.post(BackendUrl,{SearchFormInput})
    .then(res =>{
        console.log(res);
        console.log(res.data);
        setShowResult({
            showResult: true,
            searchResults: res.data
        })
    });
  }


return (
  <form onSubmit= { handleFormSubmit }> 
    <InputGroup className="no-border">
      <InputGroupText htmlFor="site id">Site ID</InputGroupText> 
      <Input 
        type="text" 
        name="site-id" 
        id="site-id" 
        value={SiteIdState.Id}
        onChange={handleSiteIdChange}
        required
      /> 
      <Button type="button" value="add" onClick={addSearchField}>Add more filters</Button>
    </InputGroup>
    {
      SearchFieldState.map((val, idx) => (
          <SearchField
              key={`query-${idx}`}
              idx={idx}
              handleSearchFieldChange ={ handleSearchFieldChange }
              // handleRadioButtonChange = { handleRadioButtonChange }
          />
      ))
    }
    <InputGroup>
      <InputGroupText htmlFor="equation">Equation</InputGroupText> 
      <Input 
        type="text" 
        name="equation" 
        id="equation" 
        onChange={handleEquationChange}
        required
      /> 
    </InputGroup>
    <InputGroupAddon addonType="append">
      <InputGroupText>
        <i className="nc-icon nc-zoom-split" />
      </InputGroupText>
      <Button type="submit" value="Submit">Submit</Button>
    </InputGroupAddon>
    
  </form>
  );
}
export default SearchBox;