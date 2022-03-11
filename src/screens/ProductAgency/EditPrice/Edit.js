import React, { Component } from "react";
import { connect } from "react-redux";
import InfoProduct from "../../../components/ProductAgency/Update/InfoProduct";
import Distribute from "../../../components/ProductAgency/Update/Distribute";
import * as productAction from "../../../actions/product";
import * as Types from "../../../constants/ActionType";
import Alert from "../../../components/Partials/Alert";

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      total: ""
    };

  }

  componentDidMount() {
    var { store_code, productId, agency_type_id } = this.props;
    this.props.fetchProductAgencyPrice(store_code, productId, agency_type_id);

  }

  handleDataFromInfo = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.main_price = data.txtPrice.toString().replace(/,/g, '').replace(/\./g, '');


      return { form: formdata };
    });
  };




  handleDataFromDistribute = (data) => {
    this.setState((prevState, props) => {
      var formdata = { ...prevState.form };
      formdata.list_distribute = data;
      return { form: formdata };

    });



  };

  postProduct = () => {
    var { store_code, productId } = this.props;
    var form = { ...this.state.form };
    console.log(form.list_distribute)
    var list_distribute = [...form.list_distribute]
    var element_distributes_price = []
    var sub_element_distributes_price = []
    if (typeof list_distribute != "undefined") {
      list_distribute.forEach((item, index) => {
        item.element_distributes.forEach(_item => {
          element_distributes_price.push({
            distribute_name: item.name,
            element_distribute: _item.name,
            price: _item.price != null ? _item.price .toString().replace(/,/g, '').replace(/\./g, '') : 0
          })
          if (typeof _item.sub_element_distributes != "undefined") {
            if (_item.sub_element_distributes.length > 0) {
              _item.sub_element_distributes.forEach(element => {
                sub_element_distributes_price.push({
                  distribute_name: item.name,
                  element_distribute: _item.name,
                  sub_element_distribute: element.name,
                  price:element.price != null ? element.price .toString().replace(/,/g, '').replace(/\./g, '') : 0
                })

              })

            }
          }
        });

      });
    }

    form.element_distributes_price = element_distributes_price.length == 0 ? null : element_distributes_price
    form.sub_element_distributes_price = sub_element_distributes_price.length == 0 ? null : sub_element_distributes_price
    delete form.list_distribute
    form.agency_type_id = this.props.agency_type_id
    console.log(form)
    // return;
    this.props.updateAgencyPrice(store_code, form, productId, null);
  };
  goBack = (e) => {
    e.preventDefault();
    var { history } = this.props;
    history.goBack();
  };
  onChangeQuantityStock = (total) => {
    this.setState({ total: total })
  }

  render() {
    var { product } = this.props;
    return (


      <div class="container-fluid">
        <Alert
          type={Types.ALERT_UID_STATUS}
          alert={this.props.alert}
        />
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4 className="h4 title_content mb-0 text-gray-800">
            Chỉnh sửa sản phẩm
          </h4>
        </div>
        <br></br>
        <div class="card mb-4">
          <div class="card-header title_content">
            Nhập giá đại lý
          </div>
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-lg-6">
                <div>
                  <InfoProduct
                    product={product}
                    handleDataFromInfo={this.handleDataFromInfo}
                  />
                </div>
              </div>


            </div>
            <div class="" style = {{padding : "0 14px"}}>
          {/* <div class="card-header title_content">
            Phân loại sản phẩm
          </div> */}
          <div >
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div >
                    <Distribute
                      onChangeQuantityStock={this.onChangeQuantityStock}
                      product={product}
                      handleDataFromDistribute={
                        this.handleDataFromDistribute
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
     
        </div>
    

        

        <div class="card mb-4">
          <div class="card-body" style={{ padding: "0.8rem" }}>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  onClick={this.postProduct}
                >
                  <i class="fa fa-plus"></i>
                  Lưu thay đổi
                </button>
                <a
                  style={{ marginLeft: "10px" }}
                  onClick={this.goBack}
                  class="btn btn-warning"
                >
                  <span class="icon text-white-50">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span class="text"> Trở về</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


    );

  }
}

const mapStateToProps = (state) => {
  return {
    product: state.productReducers.product.product_agency_price_id,
    alert: state.productReducers.alert.alert_uid,

  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {


    updateAgencyPrice: (store_code, product, productId, page) => {
      dispatch(productAction.updateAgencyPrice(store_code, product, productId, page));
    },
    fetchProductAgencyPrice: (store_code, productId, agency_type_id) => {
      dispatch(productAction.fetchProductAgencyPrice(store_code, productId, agency_type_id));
    },

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
