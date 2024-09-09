import React, { Component } from "react";
import { connect, shallowEqual } from "react-redux";
import styled from "styled-components";
import * as productAction from "../../actions/product";
import Pagination from "../../components/Product/Pagination";
import * as Env from "../../ultis/default";
import { contactOrNumber, format } from "../../ultis/helpers";
import themeData from "../../ultis/theme_data";
import * as prizeCodeApi from "../../data/remote/prize_code";
import * as Types from "../../constants/ActionType";
import './style.css';

const ListProductStyles = styled.tr``;
const SearchDataStyles = styled.div`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // .categories__content {
  //   margin-right: 20px;
  // }
`;
class ListProductPrizeMultiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      page: 1,
      numPage: 20,
      searchValue: "",
      listCategory: [],
      categorySelected: [],
      txtCategory: [],
      listProduct: [],
      productPrizeId: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !shallowEqual(this.props.category_product, nextProps.category_product)
    ) {
      var option = [];
      var categories = [...nextProps.category_product];
      if (categories.length > 0) {
        option = categories.map((category, index) => {
          return {
            id: category.id,
            label: category.name,
            categories_child: category.category_children,
          };
        });
        this.setState({
          listCategory: option,
        });
      }
    }

    return true;
  }

  handleCloseChecked = () => {
    const {
      setListProducts,
      discountId,
      defaultListProducts,
      products,
      discounts,
    } = this.props;
    if (discountId) {
      setListProducts(defaultListProducts);
      const newDiscountProduct = [];
      discounts?.forEach((element) => {
        if (element.products?.length > 0 && discountId != element?.id) {
          element.products?.forEach((product) => {
            newDiscountProduct.push(product);
          });
        }
      });
      if (
        defaultListProducts?.length !==
        products?.data?.length - newDiscountProduct?.length
      ) {
        // document.querySelector("#inputCheckAll").checked = false;
      }
    }
  };

  onChange = (e) => {
    var { value, checked } = e.target;
    const { products, discounts, listProducts, discountId } = this.props;
    if (!checked) {
      // document.querySelector("#inputCheckAll").checked = false;
    } else {
      var newDiscountProduct = [];
      discounts?.forEach((element) => {
        if (discountId) {
          if (element.products?.length > 0 && discountId != element?.id) {
            element.products?.forEach((product) => {
              if (products?.data?.map((p) => p.id).includes(product.id)) {
                newDiscountProduct.push(product);
              }
            });
          }
        } else {
          if (element.products?.length > 0) {
            element.products?.forEach((product) => {
              if (products?.data?.map((p) => p.id).includes(product.id)) {
                newDiscountProduct.push(product);
              }
            });
          }
        }
      });
      if (
        listProducts?.length ===
        products?.data?.length - newDiscountProduct?.length - 1
      ) {
        // document.querySelector("#inputCheckAll").checked = true;
      }
    }
    var data = JSON.parse(value);
    if (checked == true) this.props.handleAddProduct(data, null, "add");
    else this.props.handleAddProduct(null, data.id, "remove");
  };
  onChangeAll = (e) => {
    const { value, checked } = e.target;
    const {
      products,
      discounts,
      setListProducts,
      defaultListProducts,
      discountId,
    } = this.props;
    var currentProducts = [];

    if (checked) {
      var newDiscountIds = this.props.listProducts.map((pro) => pro.id);
      if (discountId) {
        discounts?.forEach((element) => {
          if (
            element.products?.length > 0 &&
            discountId &&
            discountId != element?.id
          ) {
            element.products?.forEach((product) => {
              newDiscountIds.push(product.id);
            });
          }
        });
      } else {
        discounts?.forEach((element) => {
          if (element.products?.length > 0) {
            element.products?.forEach((product) => {
              newDiscountIds.push(product.id);
            });
          }
        });
      }
      currentProducts = products?.data?.filter(
        (product) => newDiscountIds.includes(product.id) == false
      );

      this.props.listProducts?.forEach((element) => {
        const has = currentProducts.some((item) => item.id === element.id);
        if (has == false) {
          currentProducts.push(element);
        }
      });
    } else {
      var newListProducts = [];
      if (discountId) {
        discounts?.forEach((element) => {
          if (element.products?.length > 0 && discountId == element?.id) {
            element.products?.forEach((product) => {
              if (
                defaultListProducts.map((d) => d?.id)?.includes(product?.id)
              ) {
                newListProducts.push(product);
              }
            });
          }
        });
        currentProducts = newListProducts;
      } else {
        currentProducts = [];
      }

      currentProducts = [];
    }

    console.log(products, discounts, defaultListProducts);
    setListProducts(currentProducts);
  };
  onChangeSearch = (e) => {
    this.setState({ searchValue: e.target.value });
  };
  passNumPage = (page) => {
    this.setState({ page: page });
  };
  searchData = (e) => {
    e.preventDefault();
    var { store_code } = this.props;
    var { searchValue, numPage, categorySelected } = this.state;
    const branch_id = localStorage.getItem("branch_id");
    this.setState({ page: 1 });
    var params = this.getParams("", "", searchValue, numPage, categorySelected);
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };

  checkExsit = (list1, id) => {
    const list = list1.filter((item) => item);
    if (list && list.length > 0) {
      for (const element of list) {
        if (element.id == id) {
          return true;
        }
      }
    }
    return false;
  };

  checkDisable = (discounts, id) => {
    if (discounts.length > 0) {
      for (const element of discounts) {
        if (discounts.products?.length > 0) {
          for (const item of element.products) {
            if (item.id == id) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  onSaveProduct = () => {
    const { store_code } = this.props;

    const newData = {
      ...this.props.rowItem,
      prize_product_id: this.props.listProducts?.[0]?.id,
    };
    this.props.showLoading();
    prizeCodeApi
      .updatePrizeCode(store_code, newData, this.props.rowItem.id)
      .then((res) => {
        const data = res.data.data;
        const updatedPrizeCode = this.props.prizeCodes.map((prizeCode) => {
          if (prizeCode.id === this.props?.rowItem?.id) {
            return data;
          }
          return prizeCode;
        });
        this.props.onSetPrizeCode(updatedPrizeCode);
        this.props.showMsg(res);
        window.$(".modal").modal("hide");
      })
      .catch(() => {
        this.props.showMsg("Cập nhật thất bại");
      })
      .finally(() => {
        this.props.hideLoading();
      });
  };

  getNameSelected() {
    const { categorySelected } = this.state;
    var name = "";
    if (categorySelected.length > 0) {
      name += categorySelected.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categorySelected.length - 1
                ? currentCategory?.label
                : `${currentCategory?.label}, `
            }`
          );
        },
        ""
      );
    }

    return name;
  }
  handleCheckedCategory = (idCategory) => {
    const { categorySelected } = this.state;
    if (categorySelected?.length > 0) {
      const checked = categorySelected
        .map((category) => category?.id)
        .includes(idCategory);
      return checked;
    }
    return false;
  };

  handleChangeCategory = (category) => {
    const { categorySelected, numPage } = this.state;
    const { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    var newCategorySelected = [];

    const isExisted = categorySelected.map((c) => c?.id).includes(category?.id);
    if (isExisted) {
      newCategorySelected = categorySelected.filter(
        (c) => c?.id !== category.id
      );
    } else {
      newCategorySelected = [...categorySelected, category];
    }

    const params = this.getParams("", "", "", numPage, newCategorySelected);
    this.setState({
      categorySelected: newCategorySelected,
      page: 1,
      searchValue: "",
    });
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  onChangeNumPage = (e) => {
    const { categorySelected, searchValue } = this.state;
    const { store_code } = this.props;
    const branch_id = localStorage.getItem("branch_id");
    var numPage = e.target.value;
    this.setState({
      numPage,
      page: 1,
    });
    const params = this.getParams(
      "",
      "",
      searchValue,
      numPage,
      categorySelected
    );
    this.props.fetchAllProductV2(store_code, branch_id, 1, params);
  };
  getParams = (listType, is_near_out_of_stock, search, limit, categories) => {
    // document.querySelector("#inputCheckAll").checked = false;
    var params = ``;
    if (search != "" && search != null) {
      params = params + `&search=${search}`;
    }
    if (limit != "" && limit != null) {
      params = params + `&limit=${limit}`;
    }
    if (categories !== "" && categories !== null && categories?.length > 0) {
      const newCategorySelected = categories.reduce(
        (prevCategory, currentCategory, index) => {
          return (
            prevCategory +
            `${
              index === categories.length - 1
                ? currentCategory?.id
                : `${currentCategory?.id},`
            }`
          );
        },
        "&category_ids="
      );
      params += newCategorySelected;
    }

    return params;
  };

  handleProduct = (id, checked) => {
    const { store_code } = this.props;
    const {
      storeCode,
      limit,
      searchValue = "",
      page,
      onSetPrizeCode,
      onSetLinks,
      onSetCurrentPage,
    } = this.props;
    const newData = {
      // ...this.props.rowItem,
      prize_product_id: checked ? null : id,
      prize_code_ids: this.props.selected,
      page,
      searchValue,
      limit,
    };
    this.props.showLoading();

    prizeCodeApi
      .updateMultiProductPrizeCode(store_code, newData)
      .then((results) => {
        const data = results.data.data.data;
        const links = results.data.data.links;
        const currentPage = results.data.data.current_page;
        onSetCurrentPage(currentPage);
        onSetPrizeCode(data);
        onSetLinks(links);
        this.props.handleSetSelected([]);
        this.props.showMsg(results);
        // this.props.onSetPrizeCode(updatedPrizeCode);
      })
      .catch(() => {
        this.props.showMsg("Cập nhật thất bại");
      })
      .finally(() => {
        this.props.hideLoading();
      });
    window.$(".modal").modal("hide");
  };

  showData = (products, list, discounts) => {
    var result = null;
    if (typeof products === "undefined") {
      return result;
    }
    if (products.length > 0) {
      result = products.map((data, index) => {
        var status_name =
          data.status == 0
            ? "Còn hàng"
            : data.status == 1
            ? "Đã ẩn"
            : data.status == 2
            ? "Hết hàng"
            : null;
        var status =
          data.status == 0
            ? "success"
            : data.status == 1
            ? "secondary"
            : data.status == 2
            ? "danger"
            : null;
        var checked = this.checkExsit(list, data.id);
        var disaled = this.checkDisable(discounts, data.id);
        var background_disable = disaled == true ? "#ffddd766" : "white";

        const {
          product_discount,
          min_price,
          max_price,
          _delete,
          update,
          insert,
          per_page,
          current_page,
          store_code,
          page,
          status_stock,
          discount,
          historyInventory,
          distributes,
        } = data;
        let discount_percent = null;

        if (product_discount) {
          discount_percent = product_discount.value;
        }
        return (
          <tr
            className={disaled == true ? "" : "hover-product"}
            style={{ background: background_disable }}
          >
            {/* <td>
              <div class="checkbox">
                <label>
                  <input
                    type="radio"
                    disabled={false}
                    checked={checked}
                    onChange={this.onChange}
                    value={JSON.stringify(data)}
                    name="radio-product-selected"
                  />
                </label>
              </div>
            </td> */}
            <td>
              <img
                src={
                  data.images.length > 0
                    ? data.images[0].image_url
                    : Env.IMG_NOT_FOUND
                }
                className="img-responsive"
                alt="Image"
                style={{
                  width: "100%",
                  height: "59px",
                  width: "59px",
                  background: "#0000000d",
                }}
              />
            </td>
            <td>{data.sku}</td>

            <td>
              <p>{data.name}</p>
              {disaled && (
                <p
                  style={{
                    fontSize: 11,
                    color: "grey",
                  }}
                >
                  {"Sản phẩm có tồn tại ở chương trình giảm giá khác"}
                </p>
              )}
            </td>

            <td>
              {product_discount == null && (
                <div className="eea">
                  {min_price === max_price ? (
                    contactOrNumber(
                      format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )
                    )
                  ) : distributes && distributes.length == 0 ? (
                    contactOrNumber(
                      format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )
                    )
                  ) : (
                    <div className="ae">
                      {format(
                        Number(
                          discount_percent == null
                            ? min_price
                            : min_price - min_price * discount_percent * 0.01
                        )
                      )}
                      {" - "}
                      {format(
                        Number(
                          discount_percent == null
                            ? max_price
                            : max_price - max_price * discount_percent * 0.01
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {product_discount && (
                <div
                  className="a"
                  style={{
                    float: "left",
                  }}
                >
                  {min_price === max_price ? (
                    contactOrNumber(format(Number(min_price)))
                  ) : (
                    <div className="row e">
                      <div
                        style={
                          {
                            // textDecoration: "line-through",
                          }
                        }
                      >
                        {format(Number(min_price))}
                        {" - "}
                        {format(Number(max_price))}
                      </div>

                      {/* <div className="discount e">&emsp; -{discount_percent}%</div> */}
                    </div>
                  )}
                </div>
              )}
            </td>
            <td>
              <button
                type="button"
                onClick={() => this.handleProduct(data.id, checked)}
                class="btn btn-primary btn-sm"
              >
                <i class="fa fa-plus"></i> {checked ? "Bỏ chọn" : "Chọn"}
              </button>
            </td>

            {/* <td> <h5>
              <span class={`badge badge-${status}`}>
                {status_name}
              </span>
            </h5></td> */}
          </tr>
        );
      });
    } else {
      return result;
    }
    return result;
  };

  render() {
    var { products, store_code, listProducts, discounts } = this.props;
    var { searchValue, listCategory, numPage } = this.state;

    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="listProductPrizeMultiModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content" style={{ maxHeight: "630px" }}>
            <div class="modal-header" style={{ background: "white" }}>
              <div>
                <h4 style={{ color: "black", display: "block" }}>
                  Chọn sản phẩm
                </h4>
              </div>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={() => this.handleCloseChecked()}
              >
                &times;
              </button>
            </div>

            <SearchDataStyles  className="search-data-wrapper">
              <form  onSubmit={this.searchData}>
                <div class="input-group mb-6" style={{ padding: "0 20px" }}>
                  <input
                    style={{ maxWidth: "280px", minWidth: "150px" }}
                    type="search"
                    name="txtSearch"
                    value={searchValue}
                    onChange={this.onChangeSearch}
                    class="form-control"
                    placeholder="Tìm kiếm sản phẩm"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <div className="categories__content">
                <div
                  id="accordion"
                  style={{
                    width: "300px",
                    position: "relative",
                  }}
                >
                  <div
                    className="wrap_category input-group"
                    style={{ display: "flex" }}
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <input
                      readOnly
                      type="text"
                      class="form-control"
                      placeholder="--Chọn danh mục--"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "55px",
                        position: "relative",
                        backgroundColor: "transparent",
                      }}
                      value={this.getNameSelected()}
                    ></input>
                    <button
                      class="btn  btn-accordion-collapse collapsed input-group-text"
                      id="headingOne"
                      style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                    >
                      <i
                        className={
                          this.state.icon
                            ? "fa fa-caret-down"
                            : "fa fa-caret-down"
                        }
                      ></i>
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse"
                    ariaLabelledby="headingOne"
                    dataParent="#accordion"
                    style={{
                      position: "absolute",
                      width: "100%",
                      left: "0",
                      top: "100%",
                      zIndex: "10",
                      background: "#fff",
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        margin: "5px 0",
                        height: "250px",
                        overflowY: "auto",
                      }}
                      class="list-group"
                    >
                      {listCategory?.length > 0 ? (
                        listCategory.map((category, index) => (
                          <li
                            class=""
                            style={{
                              cursor: "pointer",
                              paddingTop: "5px",
                              paddingLeft: "5px",
                              display: "flex",
                            }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                marginRight: "10px",
                                width: "30px",
                                height: "15px",
                                flexShrink: "0",
                              }}
                              checked={this.handleCheckedCategory(category.id)}
                              onChange={() =>
                                this.handleChangeCategory(category)
                              }
                            />
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              title={category.label}
                            >
                              {category.label}
                            </div>
                          </li>
                        ))
                      ) : (
                        <div
                          style={{
                            marginTop: "20px",
                            textAlign: "center",
                          }}
                        >
                          Không có kết quả !
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </SearchDataStyles>

            <div class="table-responsive">
              <table
                class="table  table-hover table-border"
                style={{ color: "black" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "13%" }}>Hình ảnh</th>

                    <th>Mã SKU</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                  </tr>
                </thead>

                <tbody>
                  {this.showData(
                    products?.data,
                    [this.props?.rowItem?.product_prize],
                    discounts
                  )}
                </tbody>
              </table>
            </div>

            <div
              class="group-pagination_flex col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    flexShrink: "0",
                    marginBottom: "-6px",
                  }}
                >
                  {products && (
                    <Pagination
                      store_code={store_code}
                      products={products}
                      passNumPage={this.passNumPage}
                      limit={this.state.numPage}
                      search={this.state.searchValue}
                      categorySelected={this.state.categorySelected}
                      getParams={this.getParams}
                    />
                  )}
                </div>
                <select
                  name="numPage"
                  value={numPage}
                  onChange={this.onChangeNumPage}
                  id="input"
                  class="form-control"
                  style={{
                    width: "80px",
                  }}
                >
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    border: "1px solid",
                    marginRight: "10px",
                  }}
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  onClick={() => this.handleCloseChecked()}
                >
                  Hủy
                </button>
                {/* <button
                  style={{ backgroundColor: themeData().backgroundColor }}
                  onClick={this.onSaveProduct}
                  class="btn btn-info"
                >
                  Xác nhận
                </button> */}
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
    category_product: state.categoryPReducers.category_product.allCategoryP,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProductV2: (store_code, branch_id, page, params) => {
      dispatch(
        productAction.fetchAllProductV2(store_code, branch_id, page, params)
      );
    },
    showLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "show",
      });
    },
    hideLoading: (res) => {
      dispatch({
        type: Types.SHOW_LOADING,
        loading: "hide",
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListProductPrizeMultiModal);
