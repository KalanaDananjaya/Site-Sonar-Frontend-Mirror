import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import SearchField from "./SearchField.js";
import {
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Spinner,
} from "reactstrap";


import axios from 'axios';
import Select from 'react-select';

const SearchBox = (props) => {
  
  const BackendSitesUrl = `${process.env.REACT_APP_BACKEND_URL}/all_sites`;

  const [Sites,setSites] = useState([]);
  const [ResultReceived, setResultReceived] = useState(false);

  useEffect(() => {
    async function getSites(){
      const res = await axios.get(BackendSitesUrl);
      const data = res.data;
      const site_array = []
      site_array.push({value : "all", label : "All Sites"})
      for (let site of data){
        site_array.push({value : site.site_id, label : site.site_name})
      }
      setSites([...site_array]);
    }
    getSites();
  },[]);
  
  const BackendUrl = `${process.env.REACT_APP_BACKEND_URL}/search_site`
  const [SiteIdValue, setSiteIdValue] = useState("1");

  const [EquationState, setEquationState] = useState('');

  const handleSiteIdChange = (item) => {
    setSiteIdValue(item.value);
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

  const removeSearchField = (event) => {
    const list = [...SearchFieldState];
    list.splice(-1, 1);
    setSearchFieldState(list);
  }

  const handleSearchKeyFieldChange = (item, event) => {
    const updatedSearchField = [...SearchFieldState];
    updatedSearchField[item.index]["query_key"] = item.value;
    setSearchFieldState(updatedSearchField);
  };

  const handleSearchValueFieldChange = (event) => {
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

  const EquationRegex = /([A-Z]|\(|\)|&|~|\|| )/;
  const CharacterRegex = /([A-Z])/;
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setResultReceived(true);
    let NumElements = Object.keys(SearchFieldState).length;
    let Equation = EquationState.trim()
    for (let letter of Equation){
      if (CharacterRegex.test(letter)){
        // check letter in range of variables
        if ((letter.charCodeAt(0) - 65) >= NumElements){
          alert("Equation contain invalid letters for identifiers");
          return
        }
      }
      else if(!(EquationRegex.test(letter))){
        alert("Equation contains invalid characters. Only valid characters are [&,|,~,(,)]");
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
      SiteId: SiteIdValue,
      SearchFields : RenamedSearchFieldState,
      Equation: Equation,
      RunId: props.RunId
    };
    console.log(SearchFormInput);
    axios.post(BackendUrl,{SearchFormInput})
    .then(res =>{
        setResultReceived(false);
        props.storeSearchResults(res.data);  
    });
  }


return (
  <div>
    <form onSubmit= { handleFormSubmit } style={{  background: "#282C2C", margin: "10px", borderRadius: "5px"}}> 
      <InputGroup className="no-border">
        <InputGroupText htmlFor="site_id" style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}>Site ID</InputGroupText> 
        <div style={{ width : "50%", marginTop: "10px", marginBottom: "10px"}}>
          <Select options={Sites} onChange={ handleSiteIdChange }/>
        </div>
      </InputGroup>
      {
        SearchFieldState.map((val, idx) => (
            <SearchField
                key={`query-${idx}`}
                idx={idx}
                handleSearchKeyFieldChange = { handleSearchKeyFieldChange } 
                handleSearchValueFieldChange = { handleSearchValueFieldChange }
                RunId = { props.RunId }
            />
        ))
      }
      <InputGroup>
        <InputGroupText htmlFor="equation" style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}>Equation</InputGroupText> 
        <Input 
          type="text" 
          name="equation" 
          id="equation"
          onChange={ handleEquationChange }
          required
          placeholder="Enter equation"
          style={{background: '#ffffff', marginTop: "10px", marginBottom: "10px", marginRight: "10px", borderRadius: "5px"}}
        /> 
      </InputGroup>
      <InputGroup style={{ display: "flex" }}>
        <Button type="button" className="btn btn-primary float-left" style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px", backgroundColor: "#0F709B"}} onClick={ addSearchField }>Add Filter</Button>
        <Button type="button" className="btn btn-primary" style={{ marginTop: "10px", marginBottom: "10px", marginLeft: "10px", marginRight: "10px", backgroundColor: "#0F709B"}} onClick={ removeSearchField }>Remove Filter</Button>
        <Button type="submit" value="Submit" disabled={ ResultReceived } style={{ backgroundColor: "#60C73C" }}>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            color="yellow"
            hidden= { !ResultReceived }
          />
          Search</Button>
      </InputGroup>
      
    </form>
  </div>
  );
}

SearchBox.propTypes = {
  storeSearchResults: PropTypes.func
}

export default SearchBox;