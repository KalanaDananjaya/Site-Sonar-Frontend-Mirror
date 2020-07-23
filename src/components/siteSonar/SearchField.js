import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import {
    InputGroup,
    InputGroupText,
    Input,
} from "reactstrap";

import Select from 'react-select';
import axios from 'axios';

const SearchField = ({ idx, handleSearchKeyFieldChange, handleSearchValueFieldChange }) => {

        const [SearchKeys,setSearchKeys] = useState([])
        const getSearchKeysUrl = `${process.env.REACT_APP_BACKEND_URL}/search_keys`;

        useEffect(() => {
          async function getSearchKeys(){
            const res = await axios.get(getSearchKeysUrl);
            const data = JSON.parse(res.data);
            console.log('data is ',data, data[0])
            const keys = []
            for(let s_key of data){
              keys.push({value : s_key, label : s_key, index: idx});
            }
            setSearchKeys([...keys]);
          }
          getSearchKeys();
        },[]);


        const query_key = `query_key_input_${idx}`;
        const query_value = `query_value_${idx}`;
        const variable_name = String.fromCharCode(idx+65)
        return (
         <InputGroup className="no-border" key={`query_field_${idx}`}>
          <InputGroupText htmlFor="variable_name">{variable_name}</InputGroupText>
            <div style={{width : "50%" }}>
              <Select options={ SearchKeys }  data-id={idx} data-key ="query_key" id={query_key} onChange= { (item,event) => handleSearchKeyFieldChange(item,event) }/>
            </div>
            
            <Input
              type="text"
              name={query_value}
              data-id={idx}
              data-key = "query_value"
              id={query_value}
              className="query"
              onChange = { handleSearchValueFieldChange }
              placeholder="Enter search parameter value"
              required
              style={{background: '#ffffff'}}
            />
            </InputGroup>
          );
  
    }

SearchField.propTypes = {
    idx: PropTypes.number,
    SearchFieldState: PropTypes.array,
    handleSearchKeyFieldChange: PropTypes.func,
    handleSearchValueFieldChange: PropTypes.func
}

export default SearchField;
