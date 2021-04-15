import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import styled from "styled-components";
import { baseURl } from "../../constants/apiContact";
import BookingFlightInfo from "./components/BookFlightInFo";
import { initialValue, validationSchema } from "./schema";

const columnsDef = [
  {
    name: "Seat Name",
    selector: "name",
  },
  {
    name: "Seat Number",
    selector: "seatNumber",
  },
  {
    name: "Seat Number",
    selector: "seatCategoryName",
  },
  {
    name: "Status",
    cell: (data) => {
      return <div>{data.isActive ? "Available" : "Already Booked"}</div>;
    },
  },
];
class PassangerDetails extends Component {
  state = {
    responseData: [],
    toggledClearRows: false,
    selectedSeat: [],
  };

  handleSubmit = async (values) => {
    console.log(values);
    const seat = this.state.responseData?.seat.map((cotnent) => {
      if (
        this.state.selectedSeat.findIndex((data) => data.id === cotnent.id) !==
        -1
      ) {
        return { ...cotnent, isActive: false };
      }
      return { ...cotnent, isActive: true };
    });
    console.log(seat);
    axios.put(`${baseURl}api/v1/flight/${this.props.match.params.bookingId}`, {
      ...this.state.responseData,
      seat: seat,
    });
    axios
      .post(`${baseURl}api/v1/flight-booking`, {
        ...values,
        noOfPassenger: values.noOfPassenger,
      })
      .then((res) => {
        if ((res.status === 201) | (res.status === 200)) {
          this.props.history.push(
            `${this.props.match.url}/payment?noOfPassanger=${values.noOfPassanger}`
          );
          toast.info("Your booking has successfully complted.");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getbookingInfo();
  }

  getbookingInfo = () => {
    axios
      .get(`${baseURl}api/v1/flight/${this.props.match.params.bookingId}`)
      .then((res) => {
        console.log(res);
        this.setState({ responseData: res.data.data.data });
      });
  };
  handleClearRows = () => {
    this.setState({ toggledClearRows: !this.state.toggledClearRows });
  };
  handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", state.selectedRows);
    this.setState({ selectedSeat: state.selectedRows });
  };

  render() {
    return (
      <Wrapper>
        <BookingFlightInfo />
        <div className="container mt-3">
          <h3 className="my-3">Contact Information</h3>
          <span>Note: All Passanger must have valid password and visa.</span>
          {/* <button
            className="btn btn-sm btn-primary"
            onClick={this.handlePayment}
          >
            Make Payment
          </button> */}
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValue}
            // onSubmit={(values) => {
            //   console.log(values);
            //   this.handleSubmit(values);
            // }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                this.handleSubmit(values);
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {({ handleChange, handleBlur }) => {
              return (
                <Form>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <label htmlFor="">First Name</label>
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control"
                          name="firstName"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Last Name</label>
                      <div className="form-group">
                        <Field className="form-control" name="lastName" />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">Gender</label>
                        <select
                          onClick={handleChange}
                          class="form-control"
                          id="gender"
                        >
                          <option selected disabled>
                            ...
                          </option>
                          <option>Male</option>
                          <option>Famel</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Country</label>
                      <div className="form-group">
                        <Field className="form-control" name="country" />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Phone Number</label>
                      <div className="form-group">
                        <Field
                          type="number"
                          className="form-control"
                          name="mobileNumber"
                        />
                        <ErrorMessage
                          name="mobileNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Email</label>
                      <div className="form-group">
                        <Field className="form-control" name="email" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="my-3">Passanger Details</h3>
                  <span>
                    Note: All Passanger must have valid password and visa.
                  </span>
                  <div className="row mt-1">
                    <div className="col-md-4">
                      <label htmlFor="">First Name</label>
                      <div className="form-group">
                        <Field
                          type="text"
                          className="form-control"
                          name="passfirstName"
                        />
                        <ErrorMessage
                          name="passfirstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Last Name</label>
                      <div className="form-group">
                        <Field className="form-control" name="passlastName" />
                        <ErrorMessage
                          name="passlastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">Gender</label>
                        <select
                          onClick={handleChange}
                          class="form-control"
                          id="passgender"
                        >
                          <option selected disabled>
                            ...
                          </option>
                          <option>Male</option>
                          <option>Famel</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Country:</label>
                      <div className="form-group">
                        <Field className="form-control" name="passcountry" />
                        <ErrorMessage
                          name="passcountry"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Document Type:</label>
                      <div className="form-group">
                        <Field className="form-control" name="passDocType" />
                        <ErrorMessage
                          name="passDocType"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Document Number:</label>
                      <div className="form-group">
                        <Field className="form-control" name="passDocNumber" />
                        <ErrorMessage
                          name="passDocNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Phone Number</label>
                      <div className="form-group">
                        <Field
                          type="number"
                          className="form-control"
                          name="passmobileNumber"
                        />
                        <ErrorMessage
                          name="passmobileNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Email</label>
                      <div className="form-group">
                        <Field className="form-control" name="passemail" />
                        <ErrorMessage
                          name="passemail"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">No. Of Passangers</label>
                      <div className="form-group">
                        <Field
                          type="number"
                          className="form-control"
                          name="noOfPassanger"
                        />
                        <ErrorMessage
                          name="passemail"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h3 className="my-3">Available Seat Details</h3>
                      <DataTable
                        columns={columnsDef}
                        data={this.state.responseData?.seat || []}
                        noHeader={true}
                        selectableRows
                        onSelectedRowsChange={this.handleChange}
                        clearSelectedRows={this.state.toggledClearRows}
                        selectableRowDisabled={(row) => !row.isActive}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary ">
                    Save
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  h3 {
    font-weight: 700;
  }
`;

export default PassangerDetails;
