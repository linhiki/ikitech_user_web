import React, { Component } from "react";
import Select from "react-select";
import { shallowEqual } from "../../../ultis/shallowEqual";
import { formatNumber } from "../../../ultis/helpers"
import getChannel, { IKITECH } from "../../../ultis/channel";
class InfoProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      txtPrice: "",
      txtBarcode: "",
      txtStatus: "",
      category_parent: [],
      category_children_ids: [],
      txtCategory: [],
      listCategory: [],
      txtQuantityInStock: "",
      txtPercentC: "",
      disabledPrice: false,
      icon:true,
      checkHasDistribute : false,
      isLoadDistribute : false,
      sku: "",
      isChecked: true,
      txtImportPrice: "",
      check_inventory: false,
      txtCostOfCapital : ""
    };
  }
  handleChangeCheckParent(id) {

    return this.state.category_parent.map(e => e.id).indexOf(id) > -1
  }
  handleChangeCheckChild(id) {
    return this.state.category_children_ids.map(e => e.id).indexOf(id) > -1
  }
  getNameSelected() {
    var nam = "";
    var categories = this.state.listCategory;
    if (this.state.category_parent !== null) {
      categories.forEach((category) => {
        if (this.state.category_parent.map(e => e.id).indexOf(category.id) > -1) {
          nam = nam + category.label + ", "
        }

      }
      )

      if (this.state.category_children_ids !== null) {
        categories.forEach((category) => {

          category.categories_child.forEach((categoryChild) => {
            if (this.state.category_children_ids.map(e => e.id).indexOf(categoryChild.id) > -1) {
              nam = nam + categoryChild.name + ", "
            }
          })
        }
        )

      }
    }
    if (nam.length > 0) {
      nam = nam.substring(0, nam.length - 2)
    }
    return nam;
  }

  onChangeCheckHasDitribute = (e) => {
    this.setState({checkHasDistribute : !this.state.checkHasDistribute});
    this.props.checkDistribute(!this.state.checkHasDistribute , this.state.check_inventory)
    // this.props.checkDistribute(!this.state.checkHasDistribute)
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value_text = target.value;
    var value = value_text
    const _value = formatNumber(value);


    if (name == "txtPrice" || name == "txtImportPrice" || name == "txtPercentC" || name == "txtQuantityInStock") {
      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        value = value.toString().replace(/\./g, ',')
        if (name == "txtPercentC") {
          if (value.length < 3) {
            if (value_text == "") {
              this.setState({ [name]: "" });
            }
            else {
              this.setState({ [name]: value });

            }
          }
        }
        else {
          if (value.length > 14) {
            return;
          }
          if (value_text == "") {
            this.setState({ [name]: "" });
          }
          else {
            this.setState({ [name]: value });

          }
        }
      }
    }
    else {

      this.setState({ [name]: value });

    }
  };
  onChangeSelect = (selectValue) => {
    this.setState({ txtCategory: selectValue });
  };
  handleChangeParent = (category) => {
    var indexHas = this.state.category_parent.map((e) => e.id).indexOf(category.id);
    if (indexHas !== -1) {
      var newList = this.state.category_parent;
      newList.splice(indexHas, 1);
      this.setState({ category_parent: newList });
      this.state.listCategory.forEach((category1) => {
        if (category1.id === category.id) {
          category1.categories_child.forEach(categoryChild1 => {
            const indexChild = this.state.category_children_ids.map((e) => e.id).indexOf(categoryChild1.id)
            if (indexChild !== -1) {
              const newChild = this.state.category_children_ids.splice(indexChild, 1)
              console.log("newChild", newChild)
            }
          })
        }
      })
    } else {
      this.setState({ category_parent: [...this.state.category_parent, category] });
    }
    this.props.handleDataFromInfo(this.state);

  }

  handleChangeChild = (categoryChild) => {

    var categoryParentOb;
    this.state.listCategory.forEach((category) => {

      if (category.categories_child != null) {

        category.categories_child.forEach((categorychild2) => {

          if (categorychild2.id === categoryChild.id) {

            categoryParentOb = category
          }
        })
      }

    })
    if (categoryParentOb != null) {

      var indexHas = this.state.category_parent.map((e) => e.id).indexOf(categoryParentOb.id);
      if (indexHas !== -1) {

      } else {
        this.setState({ category_parent: [...this.state.category_parent, categoryParentOb] });
      }
    }

    /////
    var indexHasChild = this.state.category_children_ids.map((e) => e.id).indexOf(categoryChild.id)
    if (indexHasChild !== -1) {
      var newListChild = this.state.category_children_ids;
      newListChild.splice(indexHasChild, 1)
      this.setState({ category_children_ids: newListChild });
    } else {
      this.setState({ category_children_ids: [...this.state.category_children_ids, categoryChild] })
    }
    this.props.handleDataFromInfo(this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.total != this.props.total && typeof nextProps.total != "undefined") {
      var value = nextProps.total
      const _value = formatNumber(value);

      if (!isNaN(Number(_value))) {
        value = new Intl.NumberFormat().format(_value);
        this.setState({ txtQuantityInStock: value })
      }
    }

    if (
      !shallowEqual(nextProps.category_product, this.props.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return { id: category.id, label: category.name, categories_child: category.category_children };
        });
        this.setState({ listCategory: option });
      }
    }
    if (!shallowEqual(nextProps.product, this.props.product)) {
      var { product } = { ...nextProps };
      var categories = [];
      var listcategorynew = []
      categories = product.categories.map((category, index) => {

        if (listcategorynew.map(e => e.id).indexOf(category.id) === -1) {
          listcategorynew.push(category)
        }


        return { id: category.id, label: category.name };
      });
      console.log("eeeee");
      const price = formatNumber(product.price ?? 0);
      var _price = new Intl.NumberFormat().format(price);

      const import_price = formatNumber(product.import_price ?? 0);
      var _import_price = new Intl.NumberFormat().format(import_price);

      const quantity_stock = product.quantity_in_stock < 0 ? "" : formatNumber(product.quantity_in_stock);

      var _quantity_stock = quantity_stock == "" ? "" : new Intl.NumberFormat().format(quantity_stock);
      var checkHasDistribute = false;
      if(product.distributes != null)
      {
        checkHasDistribute = true
      }

      this.setState({
        txtName: product.name,
        txtPrice: _price,
        txtImportPrice: _import_price,
        disabledPrice: _price == 0 ? true : false,
        txtPercentC: product.percent_collaborator,
        txtBarcode: product.barcode || Math.random().toString().slice(2, 11),
        txtStatus: product.status,
        category_parent: listcategorynew,
        category_children_ids: product.category_children,
        txtQuantityInStock: _quantity_stock,
        sku: product.sku ||  Math.random().toString().slice(2, 11),
        checkHasDistribute,
        check_inventory: product.check_inventory,
        txtCostOfCapital : product.main_cost_of_capital
      });

      this.props.checkDistribute(checkHasDistribute , product.check_inventory)


    }
  }
  onChangeCheckInventory = (e) => {
    var { checked } = e.target
    this.setState({
      check_inventory: checked,

    });
    this.props.checkDistribute(this.state.checkHasDistribute , !this.state.check_inventory)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(nextState, this.state)
    ) {
      this.props.handleDataFromInfo(nextState);
    }
    return true;
  }

  onChangePrice = (e) => {
    var { checked } = e.target
    if (checked == true) {
      this.setState({ txtPrice: 0, disabledPrice: checked })
    }
    else {
      this.setState({ txtPrice: "", disabledPrice: checked })

    }
  }

  onChangeIcon = () =>
  {
    this.setState({icon: !this.state.icon})
  }
  render() {
    var {
      listCategory,
      txtName,
      txtStatus,
      txtPrice,
      category_parent,
      category_children_ids,
      txtCategory,
      txtQuantityInStock
      , txtPercentC,
      disabledPrice,
      sku,
      txtBarcode,
      txtImportPrice,
      check_inventory,
      txtCostOfCapital,
      checkHasDistribute
    } = this.state;
    console.log(checkHasDistribute);
    var txtQuantityInStock = txtQuantityInStock == -1 ? "" : txtQuantityInStock
    return (
      <div class="card-body" style={{ padding: "0.8rem" }}>


        <div class="form-group">
          <label for="product_name">Tên sản phẩm</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtName"
            placeholder="Nhập tên sản phẩm"
            autocomplete="off"
            value={txtName}
            onChange={this.onChange}
            name="txtName"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Mã SKU</label>
          <input
            type="text"
            class="form-control input-sm"
            id="sku"
            placeholder="Nhập mã SKU"
            autocomplete="off"
            value={sku}
            name="sku"
          />
        </div>
        <div class="form-group">
          <label for="product_name">Barcode</label>
          <input
            type="text"
            class="form-control input-sm"
            id="txtBarcode"
            placeholder="Nhập barcode"
            autocomplete="off"
            value={txtBarcode}
            name="txtBarcode"
          />
        </div>

        <div class="form-group">
          <div class="form-check form-switch">
            <input
              onChange={this.onChangeCheckHasDitribute}
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={checkHasDistribute}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              Có phân loại
            </label>
          </div>
        </div>
        {!checkHasDistribute && (


        <div className="form-group">

          <div className="row">
            <div className="col-6">

              <label htmlFor="name"><b>Giá bán lẻ</b></label>

              <div class="form-group" style={{ display: "flex" }}>
                <input
                  style={{ maxWidth: "420px" }}
                  type="text"
                  class="form-control"
                  id="txtEmail"
                  placeholder="Nhập giá bán lẻ"
                  autocomplete="off"
                  value={txtPrice}
                  onChange={this.onChange}
                  name="txtPrice"
                />


              </div>
            </div>

            <div className="col-6">

              <label htmlFor="name"><b>Giá nhập</b></label>

              <div class="form-group" style={{ display: "flex" }}>
                <input
                  style={{ maxWidth: "420px" }}
                  type="text"
                  class="form-control"
                  id="txtEmail"
                  placeholder="Nhập giá nhập"
                  autocomplete="off"
                  value={txtImportPrice}
                  onChange={this.onChange}
                  name="txtImportPrice"
                />



              </div>
            </div>

          </div>

        </div>)}

        <div class="form-group">
          <div class="form-check form-switch">
            <input onChange={this.onChangeCheckInventory} class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={check_inventory} />
            <label class="form-check-label" for="flexSwitchCheckDefault">Theo dõi hàng trong kho</label>
          </div>
        </div>
      

        {
          getChannel() == IKITECH &&
          <div class="form-group">
            <label for="product_name">Phần trăm hoa hồng CTV</label>
            <i style={{
              display: "block",
              marginBottom: "5px"
            }}>Bỏ trống khi sản phẩm không có hoa hồng</i>
            <input
              type="text"
              class="form-control"
              id="txtEmail"
              placeholder="Nhập %"
              autocomplete="off"
              value={txtPercentC}
              onChange={this.onChange}
              name="txtPercentC"
            />
          </div>
        }

        {
          getChannel() == IKITECH &&
          <div class="form-group">
            <label for="product_name">Trạng thái</label>

            <select
              id="input"
              class="form-control"
              value={txtStatus}
              onChange={this.onChange}
              name="txtStatus"
            >
              <option value="0">Hiển thị</option>
              <option value="-1">Tạm ẩn</option>
            </select>
          </div>
        }

        <div class="form-group">
          <label for="product_name">Danh mục</label>
          <div className="Choose-category-product">
            <div className="wrap_category" style={{ display: "flex" }}>
              <input type="text" class="form-control" placeholder="--Chọn danh mục--" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: "55px", position: "relative" }} value={this.getNameSelected()}></input>
              <button onClick={this.onChangeIcon} data-toggle="collapse" data-target="#demo2" class="btn" style={{ position: "absolute", right: "27px" }}><i                     class={this.state.icon ? "fa fa-caret-down" : "fa fa-caret-down"}
></i></button>
            </div>
            <div id="demo2" class="collapse">
              <ul style={{ listStyle: "none", margin: "5px 0" }} class="list-group">
                {listCategory.map(category => (
                  <li class="" style={{ cursor: "pointer", paddingLeft: "5px" }} ><input type="checkbox" style={{ marginRight: "10px", width: "30px", height: "15px" }} checked={this.handleChangeCheckParent(category.id)} onChange={() => this.handleChangeParent(category)} />{category.label}
                    <ul style={{ listStyle: "none", margin: "0px 45px" }} >
                      {(category?.categories_child ?? []).map(categoryChild => (
                        <li style={{ cursor: "pointer" }} ><input type="checkbox" style={{ marginRight: "10px", width: "30px", height: "15px", marginTop: "3px" }} checked={this.handleChangeCheckChild(categoryChild.id)} onChange={() => this.handleChangeChild(categoryChild)} />{categoryChild.name}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default InfoProduct;
