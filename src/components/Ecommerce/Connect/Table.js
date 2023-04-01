import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getDDMMYYYHis } from "../../../ultis/date";
import ModalUpdateConnectEcommerce from "./ModalUpdateConnectEcommerce";

const TableStyles = styled.div`
  .time_end_token {
    position: relative;
    .time_end_token_content {
      &:hover + .time_end_token_tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    .time_end_token_tooltip {
      position: absolute;
      right: 0;
      top: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      font-weight: 400;
      width: 260px;
      padding: 10px;
      border-radius: 10px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
    }
  }
  .dropdown__product {
    position: relative;
    .dropdown__product__menu {
      position: absolute;
      top: calc(100% + 2px);
      right: 0;
      z-index: 100;
      padding: 0.5rem 0;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 0.1875rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      .dropdown__product__item {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
`;
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ecommerceSelected: null,
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutside);
  }

  setEcommerceSelected = (ecommerceSelected) => {
    this.setState({ ecommerceSelected: ecommerceSelected });
  };

  handleClickOutside = (e) => {
    const isDropdownToggle = e.target.closest(".dropdown__product__toggle");
    if (!isDropdownToggle) {
      this.setState({
        ecommerceSelected: null,
      });
    }
  };

  handleShowActions = (data) => {
    this.setState({
      ecommerceSelected: data,
    });
  };

  handleOpenModal = () => {
    window.removeEventListener("click", this.handleClickOutside);
  };
  handleCloseModal = () => {
    const { fetchListConnectEcommerce } = this.props;
    this.setState({
      ecommerceSelected: null,
    });
    fetchListConnectEcommerce();
    window.addEventListener("click", this.handleClickOutside);
  };

  showData = (listConnect) => {
    var result = null;
    const { ecommerceSelected } = this.state;
    console.log("Table ~ ecommerceSelected:", ecommerceSelected);
    if (listConnect.length > 0) {
      result = listConnect.map((data, index) => {
        return (
          <React.Fragment>
            <tr class="sub-container hover-product">
              <td>
                <span
                  style={{
                    backgroundColor:
                      data.platform?.toLowerCase() === "tiki"
                        ? "#09a0ef"
                        : data.platform?.toLowerCase() === "lazada"
                        ? "#262696"
                        : data.platform?.toLowerCase() === "shopee"
                        ? "#E74B2C"
                        : data.platform?.toLowerCase() === "tiktok"
                        ? "#000"
                        : "",
                    color: "#fff",
                    padding: "3px 5px",
                  }}
                >
                  {data.platform}
                </span>
              </td>
              <td>
                <div>
                  <div>{data.shop_id}</div>
                  <div
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {data.shop_name}
                  </div>
                </div>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_products == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_inventory == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span>
                  {data.type_sync_orders == "0" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#e81414",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#3ce814",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </span>
              </td>
              <td>
                {data.expiry_token ? getDDMMYYYHis(data.expiry_token) : ""}
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                <span class="dropdown__product">
                  <span
                    className="dropdown__product__toggle"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleShowActions(data)}
                  >
                    <i className="fa fa-bars"></i>
                  </span>
                  <div
                    class="dropdown__product__menu"
                    style={{
                      display:
                        ecommerceSelected?.id == data.id ? "block" : "none",
                    }}
                  >
                    <div
                      className="dropdown__product__item"
                      type="button"
                      data-toggle="modal"
                      data-target="#modalUpdateConnectEcommerce"
                      onClick={this.handleOpenModal}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </span>
                      <span>Sửa cấu hình</span>
                    </div>
                  </div>
                </span>
              </td>
            </tr>
          </React.Fragment>
        );
      });
    } else {
      return result;
    }
    return result;
  };
  render() {
    var listConnectEcommerce = this.props.listConnectEcommerce
      ? this.props.listConnectEcommerce
      : [];
    const { store_code, fetchListConnectEcommerce } = this.props;
    const { ecommerceSelected } = this.state;

    return (
      <TableStyles
        class=""
        style={{ overflow: "auto", minHeight: "200px", paddingBottom: "50px" }}
      >
        <table className="table table-border">
          <thead>
            <tr>
              <th>Sàn TMĐT</th>
              <th>Shop ID | Tên gian hàng</th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Đồng bộ sản phẩm tự động
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Đồng bộ tồn kho tự động
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Đồng bộ đơn hàng tự động
              </th>
              <th>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "5px",
                  }}
                  className="time_end_token"
                >
                  <span>Hạn token</span>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    className="time_end_token_content"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                  <div className="time_end_token_tooltip">
                    Khi kết nối với các sàn, mỗi sàn sẽ có hạn token khác nhau,
                    khi gần hết hạn token, bạn cần kết nối lại như khi thêm mới
                    1 gian hàng bình thường để hệ thống gia hạn lại được token
                    với các sàn
                  </div>
                </div>
              </th>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>{this.showData(listConnectEcommerce)}</tbody>
        </table>
        <ModalUpdateConnectEcommerce
          store_code={store_code}
          onClose={this.handleCloseModal}
          ecommerceSelected={ecommerceSelected}
        ></ModalUpdateConnectEcommerce>
      </TableStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
