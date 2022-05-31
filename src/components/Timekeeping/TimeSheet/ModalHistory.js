import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from "moment";

import themeData from "../../../ultis/theme_data";

class ModalHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }

    }
    showHistory = (keeping_histories) => {
        var result = null
        result = keeping_histories.map((data, index) => {
            return (
                <React.Fragment>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            background: `${data.is_checkin == true ? "lightgreen" : "lightgoldenrodyellow"}`,
                            width: "fit-content",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "0.5rem",
                            width: "100%"
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    background: "green",
                                    padding: "0.02rem 0.5rem",
                                    borderRadius: "50%",
                                    marginRight: "0.3rem",
                                    color: "green",
                                }}
                            ></span>
                            <span style={{ color: `${data.is_checkin == true ? "green" : "orange"}`, fontWeight: "bold" }}>
                                {data.is_checkin == true ? "Vào làm:" : "Tan làm:"}
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                                {moment(data?.time_check).format(
                                    "HH:mm:ss"
                                )}
                                &nbsp;{
                                    data?.remote_timekeeping != true && (data.is_bonus == true ? <span style={{ color: "green" }}>
                                        Thêm công
                                    </span> : <span style={{ color: "red" }}>
                                        Bớt công
                                    </span>
                                    )}
                                {/* ({data.is_bonus == true ?      <span style={{ color: "green" }}>
                                Thêm công
                            </span> :      <span style={{ color: "red" }}>
                                Bớt công
                            </span>}) */}
                            </span>
                        </div>

                        <div>
                            {data?.remote_timekeeping ? (
                                <span
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "0.7rem",
                                    }}
                                >
                                    (Từ xa){" "}
                                </span>
                            ) : (
                                <span></span>
                            )}

                            <span style={{ color: "gray" }}>
                                {data?.reason
                                    ? `Lý do: ${data?.reason}`
                                    : ""}
                            </span>
                            <span style={{ color: "gray" , display : "block" }}>
                                {data?.from_user
                                    ? `Được tạo bởi: Quản lý ${data?.from_user_created?.name}`
                                    : `Được tạo bởi:  Nhân viên ${data?.from_staff_created?.name}`}
                                
                            </span>

                        </div>
                    </div>


                </React.Fragment>
            )
        })
        return result
    }

    render() {
        var { keeping_histories } = this.props
        console.log(keeping_histories)
        return (
            <>


                <div class="modal" id="modalHistory">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", backgroundColor: themeData().backgroundColor }}>
                                <h4 style={{ color: "white", margin: "10px" }}>Lịch sử chấm công</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <React.Fragment>
                                    {this.showHistory(keeping_histories)}
                                </React.Fragment>
                            </div>

                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Đóng
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {

}

export default connect(null, mapDispatchToProps)(ModalHistory)