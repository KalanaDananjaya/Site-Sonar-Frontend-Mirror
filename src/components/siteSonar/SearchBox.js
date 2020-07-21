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

  const EquationRegex = /([A-Z]|\(|\)|&|~|\|| )/
  const CharacterRegex = /([A-Z])/
  const handleSiteIdChange = (event) => {
    setSiteIdState(event.target.value);
  }

  const handleEquationChange = (event) => {
    setEquationState(event.target.value);
  }

  //const BlankSearchField = { variable : String.fromCharCode((65+Object.keys(SearchFieldState.length)), query_key:"", query_value:""};
  const BlankSearchField = { query_key:"", query_value:""};
  
  const [SearchFieldState, setSearchFieldState] = useState([
    {...BlankSearchField}
  ]);

  const addSearchField = (event) => {
      setSearchFieldState ([...SearchFieldState,{...BlankSearchField}]);
      console.log(SearchFieldState);
      console.log(Object.keys(SearchFieldState).length);
  }

  const handleSearchFieldChange = (event) => {
    const updatedSearchField = [...SearchFieldState];
    updatedSearchField[event.target.dataset.id][event.target.dataset.key] = event.target.value.trim();
    setSearchFieldState(updatedSearchField);
  };

  function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    let NumElements = Object.keys(SearchFieldState).length;
    let Equation = EquationState.trim()
    //console.log(RawString);
    for (let letter of Equation){
      console.log("0",letter);
      if (CharacterRegex.test(letter)){
        console.log("1",letter);
        // check letter in range of variables
        if ((letter.charCodeAt(0) - 65) >= NumElements){
          console.log("Equation contain invalid characters");
          return
        }
      }
      else if(!(EquationRegex.test(letter))){
        console.log("Equation contain invalid characters");
        return
      }
    }
    let KeyMap = {}
    for ( let i = 0; i < Object.keys(SearchFieldState).length; i++){
      let NewKey = String.fromCharCode(65+i);
      KeyMap[i] = NewKey;
    }

    let RenamedSearchFieldState = renameKeys(SearchFieldState,KeyMap)
      
    const SearchFormInput = {
      SiteId: SiteIdState.trim(),
      SearchFields : RenamedSearchFieldState,
      Equation: Equation
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
        onChange={ handleSiteIdChange }
        required
      /> 
      <Button type="button" value="add" onClick={ addSearchField }>Add more filters</Button>
    </InputGroup>
    {
      SearchFieldState.map((val, idx) => (
          <SearchField
              key={`query-${idx}`}
              idx={idx}
              handleSearchFieldChange ={ handleSearchFieldChange } 
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