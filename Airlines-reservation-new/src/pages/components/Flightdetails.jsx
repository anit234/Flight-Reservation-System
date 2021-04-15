import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseURl } from "../../constants/apiContact";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import { getQueryParams } from "../../utils/getQueryString";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import AvailableSeat from "./AvailableSeat";
export class Flightdetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flightDetails: [],
      modalShow: false,
      seatDeatils: "",
    };
  }

  componentDidMount() {
    const from = getQueryParams(this.props.location.search).get("from");
    const to = getQueryParams(this.props.location.search).get("to");
    const departure = getQueryParams(this.props.location.search).get(
      "departure"
    );
    const returnDate = getQueryParams(this.props.location.search).get("return");
    console.log(from);
    axios
      .get(`${baseURl}api/v1/flight`, {
        params: {
          from: from,
          to,
          startDate: departure,
          endingDate: returnDate,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({ flightDetails: response.data.data.data });
      });
  }

  handlePushToDetails = (content) => {
    if (this.props.auth.isAuthenticated) {
      return this.props.history.push(`/bookingDetails/${content._id}`);
    }

    toast.success("Please login first for booking!");
  };

  render() {
    return (
      <FlightdetailsWrapper>
        <div className="container">
          <table class="table mx-auto">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Departure</th>
                <th scope="col">Arrival</th>
                <th scope="col">Flight name </th>
                <th scope="col">Start Date</th>
                <th scope="col">Return Date</th>
                <th>One way / Two way</th>
                <th scope="col">Weight </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.flightDetails?.map((content) => {
                return (
                  <tr>
                    <td>{content.from}</td>
                    <td>{content.to}</td>
                    <td>{content.name}</td>
                    <td>{moment(content.startDate).format("MMM Do YY")}</td>
                    <td>{moment(content.endingDate).format("MMM Do YY")}</td>
                    <td>{content.isInbound ? "two way" : "One Way"}</td>
                    <td>{content.weight}</td>
                    <td>
                      <button
                        onClick={() => this.handlePushToDetails(content)}
                        className="btn btn-sm btn-success"
                      >
                        Book
                      </button>
                      <button
                        onClick={() =>
                          this.setState({
                            modalShow: true,
                            seatDeatils: content,
                          })
                        }
                        // to={`/bookingDetails/${content._id}`}
                        className="btn btn-sm btn-success ml-2"
                      >
                        Seat
                      </button>
                    </td>
                  </tr>
                );
              })}
              {this.state.flightDetails.length === 0 && (
                <h6 className="text-center my-3 w-100">there are no data.</h6>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Available Seat are given below:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AvailableSeat seatDeatils={this.state.seatDeatils} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalShow: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </FlightdetailsWrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Flightdetails));

const FlightdetailsWrapper = styled.div`
  margin-top: 130px;
  .table {
    /* width: 60%; */
    /* margin-top: 5%; */
  }
`;
