import React, { Component } from "react";
import { connect } from "react-redux";

import * as SettingAction from "../../actions/notification";
import styled from "styled-components";

const SettingStyles = styled.div`
  .setting__percentVar {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(130%, -50%);
  }
`;

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked_switch3: false,
      checked_switch2: false,
      stock: 0,
      enable_vat: false,
      percent_vat: 10,
    };
  }
  handChangeEnableVat = (e) => {
    this.setState({ enable_vat: !this.state.enable_vat });
  };
  handChangeCheckbox2 = (e) => {
    this.setState({ checked_switch2: !this.state.checked_switch2 });
  };
  handChangeCheckbox3 = (e) => {
    this.setState({ checked_switch3: !this.state.checked_switch3 });
  };
  onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "percent_vat" && Number(value) > 99) {
      return;
    }
    this.setState({ [name]: value });
  };

  handleUpdate = () => {
    const { store_code } = this.props;
    const formData = {
      noti_near_out_stock: this.state.checked_switch2,
      allow_semi_negative: this.state.checked_switch3,
      noti_stock_count_near: this.state.stock,
      enable_vat: this.state.enable_vat,
      percent_vat: Number(this.state.percent_vat),
    };
    this.props.updateGeneralSetting(store_code, formData);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.generalSetting !== this.props.generalSetting) {
      console.log("helllo");
      this.setState({
        checked_switch3: nextProps.generalSetting.allow_semi_negative,
        checked_switch2: nextProps.generalSetting.noti_near_out_stock,
        stock: nextProps.generalSetting.noti_stock_count_near,
        enable_vat: nextProps.generalSetting.enable_vat,
        percent_vat: nextProps.generalSetting.percent_vat,
      });
    }
    if (
      this.state.isLoading != true &&
      typeof nextProps.permission.branch_list != "undefined"
    ) {
      var permissions = nextProps.permission;

      var isShow = permissions.config_setting;
      this.setState({ isLoading: true, isShow });
    }
  };

  componentDidMount() {
    const { store_code } = this.props;
    this.props.fetchAllGeneralSetting(store_code);
  }

  render() {
    const { store_code } = this.props;
    var { isShow } = this.state;
    return (
      <SettingStyles className="">
        <div className="wrap-card">
          <div
            className="wrap-setting"
            style={{
              maxWidth: "430px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              position: "relative",
            }}
          >
            <div>Bật phí VAT</div>
            <form action="/action_page.php">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="switch4"
                  name="enable_vat"
                  checked={this.state.enable_vat}
                  onChange={this.handChangeEnableVat}
                />
                <label class="custom-control-label" for="switch4"></label>
              </div>
            </form>
            {this.state.enable_vat ? (
              <div className="setting__percentVar">
                <input
                  type="number"
                  class="form-control"
                  name="percent_vat"
                  min={0}
                  max={99}
                  onChange={this.onChange}
                  value={this.state.percent_vat}
                  style={{ width: "100px" }}
                />
              </div>
            ) : null}
          </div>

          <div
            className="wrap-setting"
            style={{
              maxWidth: "430px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <div>Thông báo sắp hết hàng</div>

            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="switch2"
                name="checked_switch2"
                checked={this.state.checked_switch2}
                onChange={this.handChangeCheckbox2}
              />
              <label class="custom-control-label" for="switch2"></label>
            </div>
          </div>
          <div
            className="wrap-setting"
            style={{
              maxWidth: "430px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <div>Cho phép bán âm</div>
            <form action="/action_page.php">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="switch3"
                  name="checked_switch3"
                  checked={this.state.checked_switch3}
                  onChange={this.handChangeCheckbox3}
                />
                <label class="custom-control-label" for="switch3"></label>
              </div>
            </form>
          </div>
          <div
            className="wrap-setting"
            style={{
              maxWidth: "430px",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
            }}
          >
            <div>Số lượng sản phẩm thông báo gần hết hàng</div>

            <input
              type="number"
              class="form-control"
              name="stock"
              onChange={this.onChange}
              value={this.state.stock}
              style={{ width: "100px" }}
            />
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onClick={this.handleUpdate}>
          <i class="fa fa-save"></i> Lưu
        </button>
      </SettingStyles>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    generalSetting: state.notificationReducers.generalSetting,
    permission: state.authReducers.permission.data,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllGeneralSetting: (store_code) => {
      dispatch(SettingAction.fetchAllGeneralSetting(store_code));
    },
    updateGeneralSetting: (store_code, data) => {
      dispatch(SettingAction.updateGeneralSetting(store_code, data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);
