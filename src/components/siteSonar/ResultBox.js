
import React from "react";
//Overlay: enable overlay = try
import { Table } from 'reactstrap';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


const ResultBox = (props) => {

  const getMatchingKeys = () => {
    return Object.keys(props.searchData.matching_nodes);
  }

  const getUnmatchingKeys = () => {
    return Object.keys(props.searchData.unmatching_nodes);
  }

  const RenderRow = (props) =>{
    console.log("row params",props)
    
    if (props.params){
      var paramNames = Object.keys(props.params);
      return (
        <tr bgcolor={props.color}> 
          <td key={props.nodename}>{props.nodename}</td>
          <td>
            <Table border="1px">
              <tbody>
                <RenderSubRow paramNames={paramNames} params={props.params}></RenderSubRow>
              </tbody>
            </Table>
          </td>
        </tr>
      )
    }
    else{
      return <tr></tr>
    }
  }

  const RenderSubRow = (props) => {
    return props.paramNames.map((paramName,index) => {
      return (
        <tr key={index}>
          <td>{paramName}</td>
          <td>{props.params[paramName]}</td>
        </tr>
      )
    });
  }

  const getMatchingRowsData = () => {
    // console.log('search data',props.searchData);
     console.log('matching nodes',props.searchData.matching_nodes);
    var items = props.searchData.matching_nodes;
    //console.log("items",items)
    var keys = getMatchingKeys();

    return keys.map((key, index)=>{
      return <RenderRow key={index} nodename={key} params={items[key]} color="green"/>
    })
  }

  const getUnmatchingRowsData = () => {
    console.log('unmatching nodes',props.searchData.unmatching_nodes);
    var items = props.searchData.unmatching_nodes;
    console.log("items",items)
    var keys = getUnmatchingKeys();
    console.log("unmatching keys",keys)
    return keys.map((key, index)=>{
      return <RenderRow key={index} nodename={key} params={items[key]} color="red"/>
    })
  }
  
  if (props.showResult){
    return (
      <div>
        <div>
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
                        <p className="card-category">Submitted Jobs</p>
                        <CardTitle tag="p">{props.searchData.submitted_jobs}</CardTitle>
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
                        <p className="card-category">Nodes Covered</p>
                        <CardTitle tag="p">{props.searchData.completed_jobs}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Last day
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
                        <p className="card-category">Matching Nodes</p>
                        <CardTitle tag="p">{props.searchData.matching_jobs}</CardTitle>
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
                        <p className="card-category">Matching Percentage</p>
                        <CardTitle tag="p">{Math.round((props.searchData.matching_jobs/props.searchData.completed_jobs)*100)}%</CardTitle>
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
          <div>
            <Table bordered>
              <thead>
                <tr>
                  <th key="nodename">Node Name</th>
                  <th key="params">Parameters</th>
                </tr>
              </thead>
              <tbody>
                {getMatchingRowsData()}
                {getUnmatchingRowsData()}
              </tbody>
            </Table>
          </div>
      </div>
      
    );
  }
  else{
    return (<a></a>)
  }
  
}


export default ResultBox;