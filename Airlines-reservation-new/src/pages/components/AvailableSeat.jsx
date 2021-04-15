import React from "react";
import styled from "styled-components";

const AvailableSeat = ({ seatDeatils }) => {
  return (
    <SeatWrapper>
      <div>
        <div>
          <div>
            {/* <h5>Available Seat are given below:</h5> */}

            <div className="indicator d-flex mt-4">
              <div className="seat-number"></div> <span>Available</span>
              <div className="seat-number booked ml-4"></div>{" "}
              <span>Booked</span>
            </div>
            <div className="card-seat mt-4">
              <div className="row ">
                {seatDeatils?.seat?.map((item) => {
                  return (
                    <div className="col-1 mt-3">
                      <div
                        className={
                          item?.isActive ? "seat-number" : "seat-number booked"
                        }
                      >
                        {item.name}
                      </div>
                    </div>
                  );
                })}
                {/* <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1  mt-3">
                  <div className="seat-number booked">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div>
                <div className="col-1 mt-3">
                  <div className="seat-number">111</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SeatWrapper>
  );
};

const SeatWrapper = styled.div`
  .card-seat {
    /* background-color: #b9b9b9; */
    padding: 20px;
  }
  .seat-number {
    background-color: blue;
    margin: 0px 3px;
    height: 30px;
    width: 30px;
    border-radius: 100px;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: bold;
    padding-top: 4px;
  }
  .booked {
    background-color: #dc3545;
    color: #fff;
  }
  span {
    margin-left: 13px;
    font-weight: 600;
    margin-top: 3px;
  }
`;

export default AvailableSeat;
