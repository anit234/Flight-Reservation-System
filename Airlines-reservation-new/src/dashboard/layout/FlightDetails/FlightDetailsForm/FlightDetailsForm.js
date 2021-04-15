import axios from "axios";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { baseURl } from "../../../../constants/apiContact";

const initialValues = {
  from: "",
  to: "",
  price: "",
  name: "",
  weight: "",
  startDate: "",
  endingDate: "",
  time: "",
  maxPassanger: "",
  isInbound: "false",
  seat: [
    { name: "", seatNumber: "", id: 1, seatCategoryName: "", isActive: true },
  ],
};

const validationSchema = Yup.object().shape({
  from: Yup.object().nullable().required("this is required Field!"),
  to: Yup.object().nullable().required("this is required Field!"),
  price: Yup.number().required("this is required Field!"),
  name: Yup.string().required("this is required Field!"),
  weight: Yup.string().required("this is required Field!"),
  startDate: Yup.date().required("this is required Field!"),
  endingDate: Yup.date().required("this is required Field!"),
  time: Yup.string().required("this is required Field!"),
  maxPassanger: Yup.number().required("this is required Field!"),
  // isInbound: false,
});
const FlightDetailsForm = ({ onClose }) => {
  const [location, setLocation] = React.useState([]);
  useEffect(() => {
    axios.get(`${baseURl}api/v1/location`).then((res) => {
      console.log(res);
      const location = res.data.data.data?.map((res) => {
        return { label: res.city, value: res._id };
      });
      setLocation(location);
    });
  }, []);

  const handleFormSubmit = (values, resetForm) => {
    axios
      .post(
        `${baseURl}api/v1/flight`,
        { ...values, from: values.from.label, to: values.to.label },
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Successfully Created");
          resetForm();
          onClose();
        }
      });
  };
  return (
    <div>
      {/* <h2 className="text-center">Add Flight Details</h2> */}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(values, resetForm);
        }}
      >
        {({ setFieldValue, setFieldTouched, values }) => {
          return (
            <Form>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">From</label>
                    <Select
                      onChange={(city, val) => {
                        setFieldValue("from", city);
                      }}
                      onBlur={() => {
                        setFieldTouched("from");
                      }}
                      name="from"
                      options={location}
                    />
                    {/* <Field className="form-control" name="from" /> */}
                    <ErrorMessage
                      name="from"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">To</label>
                    {/* <Field className="form-control" name="to" /> */}
                    <Select
                      onChange={(city, val) => {
                        setFieldValue("to", city);
                      }}
                      onBlur={() => {
                        setFieldTouched("to");
                      }}
                      name="from"
                      options={location}
                    />
                    <ErrorMessage
                      name="to"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Price</label>
                    <Field className="form-control" name="price" />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Flight Name</label>
                    <Field className="form-control" name="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Weight</label>
                    <Field className="form-control" name="weight" />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Start Date:</label>
                    <Field
                      type="date"
                      className="form-control"
                      name="startDate"
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Ending Date:</label>
                    <Field
                      type="date"
                      className="form-control"
                      name="endingDate"
                    />
                    <ErrorMessage
                      name="endingDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Passanger Size</label>
                    <Field className="form-control" name="maxPassanger" />
                    <ErrorMessage
                      name="maxPassanger"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Time</label>
                    <Field type="time" className="form-control" name="time" />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Is Inbound</label>
                  <div className="form-group">
                    <label>
                      <Field type="radio" name="isInbound" value="true" />
                      Yes
                    </label>
                    <label>
                      <Field
                        type="radio"
                        className="ml-3"
                        name="isInbound"
                        value="false"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>
              <FieldArray
                name="seat"
                render={(arrayHelpers) => (
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary my-3"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          seatNumber: "",
                          id: values.seat.length + 1,
                          isActive: true,
                        })
                      }
                    >
                      Add Seat
                    </button>

                    {values.seat && values.seat.length > 0
                      ? values.seat.map((friend, index) => (
                          <div key={index}>
                            <div className="row">
                              <div className="col-md-3">
                                <div className="form-group">
                                  <Field
                                    className="form-control"
                                    name={`seat.${index}.name`}
                                    placeholder="Seat Name"
                                  />
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="form-group">
                                  <Field
                                    className="form-control"
                                    name={`seat.${index}.seatNumber`}
                                    placeholder="Seat Number"
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <Field
                                    className="form-control"
                                    name={`seat.${index}.seatCategoryName`}
                                    placeholder="Seat Category"
                                  />
                                </div>
                              </div>
                              <div className="col-md-1">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                )}
              />
              <button type="submit" className="btn btn-primary ">
                Save
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FlightDetailsForm;
