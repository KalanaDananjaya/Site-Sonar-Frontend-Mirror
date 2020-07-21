import React from 'react';
import PropTypes from 'prop-types';
import {
 
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Button,
    ButtonGroup
  } from "reactstrap";

const SearchField = ({ idx, handleSearchFieldChange }) => {
        const query_key = `query_key_input_${idx}`;
        const query_value = `query_value_${idx}`;
        const variable_name = String.fromCharCode(idx+65)
        return (
         <InputGroup className="no-border" key={`query_field_${idx}`}>
          <InputGroupText htmlFor="variable_name">{variable_name}</InputGroupText>
            <Input
              type="text"
              name={query_key}
              data-id={idx}
              data-key = "query_key"
              id={query_key}
              className="query"
              onChange = { handleSearchFieldChange }
              placeholder="Enter search parameter name"
              required
            />
            <Input
              type="text"
              name={query_value}
              data-id={idx}
              data-key = "query_value"
              id={query_value}
              className="query"
              onChange = { handleSearchFieldChange }
              placeholder="Enter search parameter value"
              required
            />
            </InputGroup>
          );
  
    }

SearchField.propTypes = {
    idx: PropTypes.number,
    SearchFieldState: PropTypes.array,
    handleSearchFieldChange: PropTypes.func
}

export default SearchField;
