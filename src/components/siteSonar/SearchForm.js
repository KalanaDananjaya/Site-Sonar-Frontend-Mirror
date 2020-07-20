import React from "react";

import SearchBox from "./SearchBox.js";
import ResultBox from "./resultBox";

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        //this.backendUrl = 'http://127.0.0.1:5000/search_site';
        
        this.state = {
          showResult: false
        }
    }

    // handleSubmit = (Query, SiteId) => {
    //     const SearchQuery = {
    //         Query: Query,
    //         SiteId : SiteId
    //     };
    //     console.log(this.backendUrl);
    //     axios.post(this.backendUrl,{SearchQuery})
    //     .then(res =>{
    //         console.log(res);
    //         console.log(res.data);
    //         this.setState({
    //             showResult: true
    //         })
    //     });
    // };

    render() {
        return ( 
        <div>
            { <SearchBox handleSubmit = {this.handleSubmit} ></SearchBox> }

            { this.state.showResult ? <ResultBox></ResultBox>: null }
        </div>
        );
    }
}

export default SearchForm;