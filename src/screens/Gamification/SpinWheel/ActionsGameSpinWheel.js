import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../../components/Partials/Sidebar";
import Topbar from "../../../components/Partials/Topbar";
import Loading from "../../Loading";
import NotAccess from "../../../components/Partials/NotAccess";
import ActionsGameSpinWheelContent from "./child/ActionsGameSpinWheelContent";
import Footer from "../../../components/Partials/Footer";
import * as AgencyAction from "../../../actions/agency";
import * as groupCustomerAction from "../../../actions/group_customer";
const ActionsGameSpinWheelStyles = styled.div``;

class ActionsGameSpinWheel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { fetchAllAgencyType, fetchGroupCustomer } = this.props;
    const { store_code } = this.props.match.params;
    fetchAllAgencyType(store_code);
    fetchGroupCustomer(store_code);
    if (this.state.isLoading !== true) {
      var isShow = true;
      this.setState({ isShow, isLoading: true });
    }
  }

  render() {
    const { auth } = this.props;
    const { store_code, id } = this.props.match.params;
    const { isShow } = this.state;
    if (auth) {
      return (
        <ActionsGameSpinWheelStyles id="wrapper">
          <Sidebar store_code={store_code} />
          <div className="col-10 col-10-wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Topbar store_code={store_code} />
                {typeof isShow == "undefined" ? (
                  <div style={{ height: "500px" }}></div>
                ) : isShow == true ? (
                  <ActionsGameSpinWheelContent
                    store_code={store_code}
                    idGameSpinWheel={id}
                  />
                ) : (
                  <NotAccess></NotAccess>
                )}
              </div>
              <Footer />
            </div>
          </div>
        </ActionsGameSpinWheelStyles>
      );
    } else if (auth === false) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducers.login.authentication,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllAgencyType: (store_code) => {
      dispatch(AgencyAction.fetchAllAgencyType(store_code));
    },
    fetchGroupCustomer: (store_code) => {
      dispatch(groupCustomerAction.fetchGroupCustomer(store_code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsGameSpinWheel);
