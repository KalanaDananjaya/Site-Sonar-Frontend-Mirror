import React, { useState, useEffect } from "react";
import axios from 'axios';

const LastRunDiv = () => {

    const BackendUrl = `${process.env.REACT_APP_BACKEND_URL}/last_run`;
    const [RunState, setRunState] = useState('');

    useEffect(() => {
        console.log(BackendUrl);
        axios.get(BackendUrl)
        .then( res => {
            console.log(res.data);
            setRunState(res.data)
        })
      }, [RunState.run_id, RunState.started_at, RunState.finished_at, RunState.state]);

    return ( 
        // <div onLoad={getLastRunData()}>
        <div>
            <span>{RunState.run_id}</span>
            <span>{RunState.started_at}</span>
            <span>{RunState.finished_at}</span>
            <span>{RunState.state}</span>
        </div>
        );
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

export default LastRunDiv;