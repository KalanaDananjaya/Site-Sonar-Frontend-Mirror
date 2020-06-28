import React from "react";

import {
 
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";


class SearchBox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        Query :'',
        Site_id:''
      }
  }
  
  handleQueryChange = event =>{
      this.setState({Query: event.target.value});
  }
  handleSiteChange = event =>{
    this.setState({Site_id: event.target.value});
  }

  formSubmitHandler = event =>{
    event.preventDefault();
    this.props.handleSubmit(this.state.Query, this.state.Site_id);
  }

  render() {
      return (
          <form onSubmit={this.formSubmitHandler}>
            <InputGroup className="no-border">
            <Input type="text" onChange={this.handleQueryChange} placeholder="Enter search query" />
            <Input type="text" onChange={this.handleSiteChange} placeholder="Enter site id" />
            <Button type="submit" value="Submit">Submit</Button>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
      );
  }
}

export default SearchBox;