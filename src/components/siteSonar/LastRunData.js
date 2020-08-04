import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    InputGroup,
    InputGroupText,
  } from "reactstrap";

  import {
    
    Input,
    Button
  } from "reactstrap";

import Select from 'react-select';

const LastRunDiv = (props) => {

    const BackendRunsUrl = `${process.env.REACT_APP_BACKEND_URL}/all_runs`;
    
    const [RunSummary, setRunSummary] = useState([]);
    

    const handleRunSelection = (item) => {
      props.handleRunSelection(item.value);
    }

    const handleRunSubmit = () => {
      props.handleRunSubmit();
    }
    
    useEffect(() => {
      async function getRuns(){
        const res = await axios.get(BackendRunsUrl);

        props.handleRunChange(res.data);

        const all_runs = res.data.all_runs;
        const run_array =[]
        for (const element in all_runs) {
          run_array.push({value : all_runs[element].run_id, label : all_runs[element].run_id})
        }
        setRunSummary([...run_array]);
      }
      getRuns();
    },[]);

    return (
        <div>
            <Row>
            <InputGroup className="no-border">
              <InputGroupText htmlFor="run_id">Run ID</InputGroupText> 
                <div style={{width : "50%" }}>
                  <Select options={ RunSummary } onChange={ handleRunSelection } />
                </div>
                <Button type="submit" onClick = { handleRunSubmit } >Set Run</Button>
            </InputGroup>
            </Row>
            <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Last Run Id</p>
                        <CardTitle tag="p">{props.RunState.selected_run.run_id}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Started At</p>
                        <CardTitle tag="p" style={{fontSize: 15}}>{props.RunState.selected_run.started_at}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Not defined
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Finished At</p>
                        <CardTitle tag="p" style={{fontSize: 15}}>{props.RunState.selected_run.finished_at}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">State</p>
                        <CardTitle tag="p" style={{fontSize: 18}}>{props.RunState.selected_run.state}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
        );
}

export default LastRunDiv;