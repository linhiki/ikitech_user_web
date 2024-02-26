import React, { Component } from "react";
import * as CategoryPAction from "../../actions/category_product";
import { connect } from "react-redux";
import * as helper from "../../ultis/helpers";
import { compressed } from "../../ultis/helpers";
import { shallowEqual } from "../../ultis/shallowEqual";
import { isEmpty } from "../../ultis/helpers";
import * as Types from "../../constants/ActionType";
import themeData from "../../ultis/theme_data";
import * as uploadApi from "../../data/remote/upload";
import "./style.css";
import Upload from "../Upload";
class ModalCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: "",
      fileUpload: null,
      isShowHome: false,
      bannerImages: [],
      bannerLinks: ["", ""],
      mainImage: "",
    };
  }

  componentDidMount() {
    var _this = this;

    window.$("#file-category-product").on("fileloaded", function (event, file) {
      _this.setState({ fileUpload: file });
    });
    window
      .$("#file-category-product")
      .on("fileremoved", function (event, id, index) {
        _this.setState({ fileUpload: null });
      });

    helper.loadFileInput("file-category-product");
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (
      !shallowEqual(nextProps.category_product, this.props.category_product)
    ) {
      window.$(".modal").modal("hide");
      window.$("#file-category-product").fileinput("clear");
      this.setState({
        txtName: "",
        isShowHome: false,
      });
    }
  }
  handleClear = () => {
    this.setState({
      txtName: "",
      fileUpload: null,
      isShowHome: false,
      bannerImages: [],
      bannerLinks: ["", ""],
    });
    window.$("#file-category-product").fileinput("clear");
  };
  onSave = async (e) => {
    e.preventDefault();

    if (this.state.txtName == null || !isEmpty(this.state.txtName)) {
      this.props.showError({
        type: Types.ALERT_UID_STATUS,
        alert: {
          type: "danger",
          title: "Lỗi",
          disable: "show",
          content: "Tên danh mục không được để trống",
        },
      });
      return;
    }
    const BannerAds = this.state.bannerImages.length
      ? this.state.bannerImages.map((item, index) => ({
          image: item,
          link: this.state.bannerLinks[index] || "",
        }))
      : [];
    const params = {
      name: this.state.txtName,
      is_show_home: this.state.isShowHome,
      banner_ads: BannerAds,
      image_url: this.state.mainImage,
    };
    this.props.createCategoryP(this.props.store_code, { ...params });
    this.setState({ fileUpload: null });
  };

  handleUploadImage = async (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      const newFile = file[0];
      const fd = new FormData();
      fd.append("image", await compressed(newFile));
      uploadApi
        .upload(fd)
        .then((res) => {
          this.setState({
            mainImage: res.data.data,
          });
        })
        .catch(function (error) {
          console.log("error: ", error);
        });
    }
  };

  handleRemoveImage = () => {
    this.setState({
      mainImage: "",
    });
  };

  setBannerImages = (images) => {
    this.setState({ bannerImages: images });
  };

  onChangeLink = (e, index) => {
    var newBannerLinks = this.state.bannerLinks;
    newBannerLinks[index] = e.target.value;
    this.setState({ bannerLinks: newBannerLinks });
  };

  renderBannerImages = () => {
    const { bannerImages } = this.state;
    return (
      <div className="group-banner-image">
        <Upload
          isShowDefault={true}
          multiple
          setFiles={this.setBannerImages}
          files={bannerImages}
          images={bannerImages}
          limit={2}
          imageType="CATEGORY"
        />
        <div style={{ marginLeft: "162px", display: "flex", gap: "16px" }}>
          {bannerImages && bannerImages.length
            ? bannerImages.map((item, index) => {
                return (
                  <div style={{ width: "290px", marginTop: "12px" }}>
                    <label>Link ảnh {index + 1}:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtName"
                      placeholder={`Đường dẫn ảnh ${index + 1}`}
                      autoComplete="off"
                      onChange={(e) => this.onChangeLink(e, index)}
                      name="txtName"
                      style={{ width: "290px" }}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  };

  render() {
    var { txtName, isShowHome } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="createModal"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ backgroundColor: themeData().backgroundColor }}
            >
              <h4 class="modal-title">Thêm danh mục</h4>

              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
                onClick={this.handleClear}
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={this.onSave}
              role="form"
              action="#"
              method="post"
              id="createForm"
            >
              <div class="modal-body" style={{ padding: " 0 10px" }}>
                <div class="form-group">
                  <div style={{ fontWeight: "bold" }} for="product_name">
                    Tên danh mục
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    id="txtName"
                    placeholder="Nhập tên danh mục"
                    autoComplete="off"
                    value={txtName}
                    onChange={this.onChange}
                    name="txtName"
                  />
                  <div
                    class="form-check"
                    style={{ marginTop: "10px", padding: "0" }}
                  >
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        name="even"
                        onChange={() =>
                          this.setState({ isShowHome: !isShowHome })
                        }
                        checked={isShowHome}
                      />{" "}
                      Hiển thị danh mục sản phẩm
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <label for="product_name" style={{ margin: 0 }}>
                    Hình ảnh
                  </label>
                  <div className="file-loading">
                    <input
                      id="file-category-product"
                      type="file"
                      className="file"
                      data-overwrite-initial="false"
                      data-min-file-count="2"
                      onChange={this.handleUploadImage}
                    />
                  </div>
                </div>
                {isShowHome && (
                  <div>
                    <p style={{ fontWeight: "600" }}>
                      Thêm ảnh banner(Giới hạn 2 ảnh):
                    </p>
                    <div>{this.renderBannerImages()}</div>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.handleClear}
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-warning">
                  Tạo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    showError: (error) => {
      dispatch(error);
    },
    createCategoryP: (id, form) => {
      dispatch(CategoryPAction.createCategoryP(id, form));
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalCreate);
