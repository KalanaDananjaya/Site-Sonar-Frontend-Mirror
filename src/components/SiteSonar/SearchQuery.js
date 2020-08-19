import React from "react";
import PropTypes from "prop-types";
import { InputGroup, InputGroupText } from "reactstrap";

const SearchQuery = (props) => {
  return (
    <div style={{ background: "#282C2C", margin: "10px", borderRadius: "5px" }}>
      <InputGroup>
        <h3
          htmlFor="equation-label"
          style={{
            margin: "auto",
            marginTop: "10px",
            color: "white",
          }}
        >
          Search Results for...
        </h3>
      </InputGroup>
      <InputGroup>
        <InputGroupText
          htmlFor="equation"
          hidden={props.hidden}
          style={{
            margin: "auto",
            marginBottom: "10px",
          }}
        >
          {props.equation}
        </InputGroupText>
      </InputGroup>
    </div>
  );
};

SearchQuery.propTypes = {
  equation: PropTypes.string,
};

export default SearchQuery;
