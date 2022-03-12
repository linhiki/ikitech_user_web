import React, { Component } from "react";
import * as themeAction from "../../../actions/theme";
import { connect } from "react-redux";
import { shallowEqual } from "../../../ultis/shallowEqual";
import * as Env from "../../../ultis/default";
class Custom_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_type: null,
    };
  }

  chooseHeader = (index) => {
    this.props.chooseHeader(index);
  };

  checkExsitItem = (index, _isVip, isVip, list_id_theme) => {
    console.log(index, _isVip, isVip, list_id_theme);
    if (_isVip == true) {
      if (isVip == true) {
        var bool = false;
        if (list_id_theme == null) {
          return false;
        }
        for (const item of list_id_theme) {
          if (item == index) {
            bool = true;
          }
        }
        return bool;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    var { header_type, v } = this.props;

    var isVip =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip == null
        ? false
        : true;
    var list_id_theme =
      typeof this.props.badges.config_user_vip == "undefined" ||
      this.props.badges.config_user_vip != null
        ? this.props.badges.config_user_vip.list_id_theme_vip
        : [];

    return (
      <div
        class={`form-group col-xs-12 col-lg-12 col-md-12 col-sm-12 ${
          this.checkExsitItem(v.index, v.isVip, isVip, list_id_theme) == true
            ? ""
            : "hide"
        }`}
      >
        <div class="row">
          <div class="col-10">
            <img
              style={{
                objectFit: "cover",
                borderRadius: "0px",
              }}
              src={v.header}
              width="100%"
              height="120"
            />
          </div>
          <div class="col-2 kv-avatar">
            <div style={{ display: "flex" }}>
              <button
                onClick={() => this.chooseHeader(v.index)}
                style={{ margin: "10px auto" }}
                type="button"
                class={`btn btn-primary btn-sm ${
                  header_type !== v.index ? "show" : "hide"
                }`}
              >
                <i class="fa fa-plus"></i> Chọn
              </button>
              <button
                style={{ margin: "10px auto" }}
                type="button"
                class={`btn btn-secondary btn-sm ${
                  header_type === v.index ? "show" : "hide"
                }`}
              >
                <i class="fa fa-check"></i> Đã chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    updateTheme: (store_code, theme) => {
      dispatch(themeAction.updateTheme(store_code, theme));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Custom_Screen);
