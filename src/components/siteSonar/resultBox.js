
import React from "react";
//Overlay: enable overlay = try
import { Pie } from "react-chartjs-2";
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

import { dashboardEmailStatisticsChart } from "../Charts/PieChart.js";

class ResultBox extends React.Component {
    constructor(props){
        super(props);
        this.test = ['a',2,'5']
    }

    render() {
        return (
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Grid Config</CardTitle>
                  <p className="card-category">Sitename</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
        );
    }
}

export default ResultBox;