import React from "react";
import { Table } from "reactstrap";
// reactstrap components
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import { CSVLink } from "react-csv";

const ResultBox = (props) => {
  const createSitesCSV = () => {
    const results = [["Site Name", "State"]];
    var items = props.searchData.matching_sites_list;
    var keys = Object.keys(props.searchData.matching_sites_list);

    if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
      keys.map((key) => {
        results.push([items[key], "SUPPORTED"]);
      });
    }

    items = props.searchData.unmatching_sites_list;
    keys = Object.keys(props.searchData.unmatching_sites_list);

    if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
      keys.map((key) => {
        results.push([items[key], "NOT SUPPORTED"]);
      });
    }

    items = props.searchData.incomplete_sites_list;
    keys = Object.keys(props.searchData.incomplete_sites_list);

    if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
      keys.map((key) => {
        results.push([items[key], "N/A"]);
      });
    }
    return results;
  };

  const createNodesCSVData = () => {
    var items = props.searchData.matching_nodes_data;
    var keys = getMatchingKeys();

    var results = [];
    if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
      const paramKeys = Object.keys(items[keys[0]]);
      keys.map((nodename) => {
        const node = {};
        node["nodename"] = nodename;
        const params = {};
        paramKeys.map((paramName) => {
          params[paramName] = items[nodename][paramName];
        });
        node["params"] = params;
        node["supported"] = "SUPPORTED";
        results.push(node);
      });
    }

    items = props.searchData.unmatching_nodes_data;
    keys = getUnmatchingKeys();

    if (!(Object.keys(items).length === 0 && items.constructor === Object)) {
      var paramKeys = Object.keys(items[keys[0]]);
      keys.map((nodename) => {
        const node = {};
        node["nodename"] = nodename;
        const params = {};
        paramKeys.map((paramName) => {
          params[paramName] = items[nodename][paramName];
        });
        node["params"] = params;
        node["supported"] = "NOT SUPPORTED";
        results.push(node);
      });
    }
    return results;
  };

  const createNodesCSVHeaders = () => {
    const results = createNodesCSVData();
    const headers = [{ label: "Node Name", key: "nodename" }];
    if (!(results.length == null || results.length === 0)) {
      var paramNames = Object.keys(results[0]["params"]);
      paramNames.map((paramName) => {
        headers.push({ label: paramName, key: "params." + paramName });
      });
      headers.push({ label: "Supported", key: "supported" });

      return headers;
    }
  };

  const getMatchingKeys = () => {
    return Object.keys(props.searchData.matching_nodes_data);
  };

  const getUnmatchingKeys = () => {
    return Object.keys(props.searchData.unmatching_nodes_data);
  };

  const RenderRow = (props) => {
    if (props.params) {
      const paramNames = Object.keys(props.params);
      return (
        <tr bgcolor={props.color}>
          <td key={props.nodename}>
            <strong>{props.nodename}</strong>
          </td>
          <td>
            <Table border="1px" style={{ color: "white" }}>
              <tbody>
                <RenderSubRow
                  paramNames={paramNames}
                  params={props.params}
                ></RenderSubRow>
              </tbody>
            </Table>
          </td>
        </tr>
      );
    } else {
      return <tr></tr>;
    }
  };

  const RenderSubRow = (props) => {
    return props.paramNames.map((paramName, index) => {
      return (
        <tr key={index}>
          <td>
            <strong>{paramName}</strong>
          </td>
          <td>
            <strong>{props.params[paramName]}</strong>
          </td>
        </tr>
      );
    });
  };

  const getMatchingRowsData = () => {
    var items = props.searchData.matching_nodes_data;
    var keys = getMatchingKeys();

    return keys.map((key, index) => {
      return (
        <RenderRow
          key={index}
          nodename={key}
          params={items[key]}
          color="green"
        />
      );
    });
  };

  const getUnmatchingRowsData = () => {
    var items = props.searchData.unmatching_nodes_data;
    var keys = getUnmatchingKeys();
    return keys.map((key, index) => {
      return (
        <RenderRow key={index} nodename={key} params={items[key]} color="red" />
      );
    });
  };

  const RenderSiteRow = (props) => {
    return (
      <tr bgcolor={props.color}>
        <td key={props.sitename}>
          <strong>{props.sitename}</strong>
        </td>
        <td>
          <strong>{props.state}</strong>
        </td>
      </tr>
    );
  };
  const getMatchingSites = () => {
    var items = props.searchData.matching_sites_list;
    var keys = Object.keys(props.searchData.matching_sites_list);
    return keys.map((key, index) => {
      return (
        <RenderSiteRow
          key={index}
          sitename={items[key]}
          color="green"
          state="Supported"
        />
      );
    });
  };

  const getUnmatchingSites = () => {
    var items = props.searchData.unmatching_sites_list;
    var keys = Object.keys(props.searchData.unmatching_sites_list);
    return keys.map((key, index) => {
      return (
        <RenderSiteRow
          key={index}
          sitename={items[key]}
          color="red"
          state="Not Supported"
        />
      );
    });
  };

  const getIncompleteSites = () => {
    var items = props.searchData.incomplete_sites_list;
    var keys = Object.keys(props.searchData.incomplete_sites_list);
    return keys.map((key, index) => {
      return (
        <RenderSiteRow
          key={index}
          sitename={items[key]}
          color="orange"
          state="N/A"
        />
      );
    });
  };

  if (props.showResult) {
    if (props.GridSearch) {
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
                          <CardTitle tag="p">
                            {props.searchData.total_sites}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {props.searchData.covered_sites}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {props.searchData.matching_sites}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {Math.round(
                              (props.searchData.matching_sites /
                                props.searchData.covered_sites) *
                                100
                            )}
                            %
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <div>
              <CSVLink
                data={createSitesCSV()}
                filename={"site-sonar-sites.csv"}
              >
                <Button
                  className="btn btn-primary"
                  raised="true"
                  color="primary"
                >
                  Export Results
                </Button>
              </CSVLink>
            </div>
            <Table bordered style={{ color: "white" }}>
              <thead bgcolor="#282C2C">
                <tr>
                  <th key="sitename">Site Name</th>
                  <th key="state">State</th>
                </tr>
              </thead>
              <tbody>
                {getMatchingSites()}
                {getUnmatchingSites()}
                {getIncompleteSites()}
              </tbody>
            </Table>
          </div>
        </div>
      );
    } else {
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
                          <CardTitle tag="p">
                            ~{props.searchData.total_nodes}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {props.searchData.covered_nodes}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {props.searchData.matching_nodes}
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
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
                          <CardTitle tag="p">
                            {Math.round(
                              (props.searchData.matching_nodes /
                                props.searchData.covered_nodes) *
                                100
                            )}
                            %
                          </CardTitle>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <div>
              <CSVLink
                data={createNodesCSVData()}
                headers={createNodesCSVHeaders()}
                filename={"site-sonar-nodes.csv"}
              >
                <Button
                  className="btn btn-primary"
                  raised="true"
                  color="primary"
                >
                  Export Results
                </Button>
              </CSVLink>
            </div>
            <Table bordered style={{ color: "white" }}>
              <thead bgcolor="#282C2C">
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
  } else {
    return <div></div>;
  }
};

export default ResultBox;
