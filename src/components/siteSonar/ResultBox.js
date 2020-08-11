
import React from "react";
//Overlay: enable overlay = try
import { Table } from 'reactstrap';
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


const ResultBox = (props) => {

  const getMatchingKeys = () => {
    return Object.keys(props.searchData.matching_nodes_data);
  }

  const getUnmatchingKeys = () => {
    return Object.keys(props.searchData.unmatching_nodes_data);
  }

  const RenderRow = (props) =>{
    console.log("row params",props)
    
    if (props.params){
      var paramNames = Object.keys(props.params);
      return (
        <tr bgcolor={props.color}> 
          <td key={props.nodename}><strong>{props.nodename}</strong></td>
          <td>
            <Table border="1px" style={{ color : "white"}}>
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
          <td><strong>{paramName}</strong></td>
          <td><strong>{props.params[paramName]}</strong></td>
        </tr>
      )
    });
  }

  const getMatchingRowsData = () => {
    console.log('matching nodes',props.searchData.matching_nodes_data);
    var items = props.searchData.matching_nodes_data;
    var keys = getMatchingKeys();

    return keys.map((key, index)=>{
      return <RenderRow key={index} nodename={key} params={items[key]} color="green"/>
    })
  }

  const getUnmatchingRowsData = () => {
    console.log('unmatching nodes',props.searchData.unmatching_nodes_data);
    var items = props.searchData.unmatching_nodes_data;
    console.log("items",items)
    var keys = getUnmatchingKeys();
    console.log("unmatching keys",keys)
    return keys.map((key, index)=>{
      return <RenderRow key={index} nodename={key} params={items[key]} color="red"/>
    })
  }

  const RenderSiteRow = (props) =>{  
    console.log('params are',props.sitename);
    return (
      <tr bgcolor={props.color}>
        <td key={props.sitename}><strong>{props.sitename}</strong></td>
        <td><strong>{props.state}</strong></td>
      </tr>
    )
    
  }
  const getMatchingSites = () => {
    console.log('matching sites',props.searchData.matching_sites_list, Object.keys(props.searchData.matching_sites_list));
    var items = props.searchData.matching_sites_list;
    var keys = Object.keys(props.searchData.matching_sites_list);
    return keys.map((key, index)=>{
      return <RenderSiteRow key={index} sitename={items[key]} color="green" state="Supported"/>
    })
  }

  const getUnmatchingSites = () => {
    console.log('unmatching sites',props.searchData.unmatching_sites_list);
    var items = props.searchData.unmatching_sites_list;
    var keys = Object.keys(props.searchData.unmatching_sites_list);
    return keys.map((key, index)=>{
      return <RenderSiteRow key={index} sitename={items[key]} color="red" state="Not Supported"/>
    })
  }

  const getIncompleteSites = () => {
    console.log('matching sites',props.searchData.incomplete_sites_list);
    var items = props.searchData.incomplete_sites_list;
    var keys = Object.keys(props.searchData.incomplete_sites_list);
    return keys.map((key, index)=>{
      return <RenderSiteRow key={index} sitename={items[key]} color="orange" state="N/A"/>
    })
  }
  
  if (props.showResult){
    if (props.GridSearch){
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
                          <p className="card-category">Total Grid Sites</p>
                          <CardTitle tag="p">{props.searchData.total_sites}</CardTitle>
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
                          <p className="card-category">Sites Covered</p>
                          <CardTitle tag="p">{props.searchData.covered_sites}</CardTitle>
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
                          <p className="card-category">Matching Sites</p>
                          <CardTitle tag="p">{props.searchData.matching_sites}</CardTitle>
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
                          <CardTitle tag="p">{Math.round((props.searchData.matching_sites/props.searchData.covered_sites)*100)}%</CardTitle>
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
              <Table bordered style={{ color : "white"}}>
                <thead bgColor="darkgray">
                  <tr>
                    <th key="sitename">Site Name</th>
                    <th key="state">State</th>
                  </tr>
                </thead>
                <tbody>
                  { getMatchingSites() }
                  { getUnmatchingSites() }
                  { getIncompleteSites() }
                </tbody>
              </Table>
            </div>
        </div>
      )
    }
    else{
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
                          <p className="card-category">Total Nodes</p>
                          <CardTitle tag="p">~{props.searchData.total_nodes}</CardTitle>
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
                          <CardTitle tag="p">{props.searchData.covered_nodes}</CardTitle>
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
                          <CardTitle tag="p">{props.searchData.matching_nodes}</CardTitle>
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
                          <p className="card-category">Percentage</p>
                          <CardTitle tag="p">{Math.round((props.searchData.matching_nodes/props.searchData.covered_nodes)*100)}%</CardTitle>
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
              <Table bordered style={{ color : "white"}}>
                <thead bgColor="darkgray">
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
      )
    }
  }  
  else{
    return (<div></div>)
  }
  
}


export default ResultBox;