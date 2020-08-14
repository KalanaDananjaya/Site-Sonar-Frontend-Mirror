import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import {
    InputGroup,
    InputGroupText,
    Input,
} from "reactstrap";

import Select from 'react-select';
import axios from 'axios';

const SearchField = (props) => {
        const [SearchKeys,setSearchKeys] = useState([])
        const getSearchKeysUrl = `${process.env.REACT_APP_BACKEND_URL}/search_keys`;

        useEffect(() => {
          async function getSearchKeys(){
            const Run = {
              RunId : props.RunId
            }
            if (Run.RunId){
              const res = await axios.post(getSearchKeysUrl,{Run});
              const data = JSON.parse(res.data);
              const keys = []
              for(let s_key of data){
                keys.push({value : s_key, label : s_key, index: props.idx});
              }
              setSearchKeys([...keys]);
            }
          }
          getSearchKeys();
        },[props.RunId]);


        const query_key = `query_key_input_${props.idx}`;
        const query_value = `query_value_${props.idx}`;
        const variable_name = String.fromCharCode(props.idx+65)
        return (
         <InputGroup className="no-border" key={`query_field_${props.idx}`}>
          <InputGroupText htmlFor="variable_name" style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}>{variable_name}</InputGroupText>
            <div style={{ width : "50%",marginTop: "10px", marginBottom: "10px", marginRight: "10px" }}>
              <Select options={ SearchKeys }  data-id={props.idx} data-key ="query_key" id={query_key} onChange= { (item,event) => props.handleSearchKeyFieldChange(item,event) }/>
            </div>
            
            <Input
              type="text"
              name={query_value}
              data-id={props.idx}
              data-key = "query_value"
              id={query_value}
              className="query"
              onChange = { props.handleSearchValueFieldChange }
              placeholder="Enter search parameter value"
              required
              style={{background: '#ffffff', marginTop: "10px", marginBottom: "10px", marginRight: "10px", borderRadius: "5px"}}
            />
            </InputGroup>
          );
  
    }

SearchField.propTypes = {
    idx: PropTypes.number,
    RunId: PropTypes.number,
    handleSearchKeyFieldChange: PropTypes.func,
    handleSearchValueFieldChange: PropTypes.func
}

export default SearchField;
