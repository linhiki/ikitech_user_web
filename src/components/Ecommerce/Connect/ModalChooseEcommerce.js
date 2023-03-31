import React, { Component } from "react";
import * as ecommerceAction from "../../../actions/ecommerce";
import { connect } from "react-redux";
import { formatNumber, callUrl } from "../../../ultis/helpers";

const ecommerces = [
  {
    id: 1,
    name: "Shopee",
    value: "SHOPEE",
    svg: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_162_3459)">
          <path
            d="M34.3378 37.7195C34.7585 34.3177 32.5379 32.1478 26.6767 30.3018C23.8377 29.3458 22.5004 28.0941 22.5317 26.3685C22.6502 24.4581 24.4538 23.0648 26.8459 23.0182C28.5038 23.0509 30.3453 23.4506 32.1361 24.6296C32.349 24.7619 32.4987 24.7411 32.6197 24.5605C32.7855 24.2972 33.1969 23.6653 33.3353 23.4388C33.429 23.2908 33.4472 23.0997 33.21 22.9292C32.8706 22.6807 31.9185 22.1775 31.4075 21.9665C30.0187 21.3927 28.4601 21.0314 26.798 21.0347C23.2966 21.0492 20.5373 23.2353 20.3071 26.1526C20.1565 28.2576 21.2125 29.9676 23.4799 31.2712C23.9604 31.5476 26.5615 32.5685 27.596 32.8863C30.8506 33.8864 32.5404 35.679 32.1428 37.769C31.7818 39.6653 29.7602 40.8899 26.9736 40.9272C24.7641 40.844 22.7759 39.9552 21.2342 38.7718C21.1952 38.7431 21.0015 38.5949 20.9752 38.575C20.7846 38.4277 20.5765 38.4373 20.4499 38.6279C20.3561 38.7681 19.7603 39.6173 19.6099 39.8403C19.4686 40.0366 19.5442 40.1445 19.691 40.2649C20.3353 40.7949 21.1899 41.3745 21.7727 41.6678C23.374 42.4735 25.1122 42.9151 26.9614 42.9844C28.1504 43.0639 29.6504 42.8117 30.7695 42.343C32.7799 41.5009 34.0782 39.8189 34.3378 37.7195ZM27.105 7.73325C23.3111 7.73325 20.2186 11.2622 20.0738 15.6794H34.1363C33.9915 11.2622 30.8989 7.73325 27.105 7.73325ZM41.5086 48.6458L41.3634 48.6469L12.4054 48.6427H12.4047C10.4351 48.57 8.98668 46.9944 8.78908 45.0383L8.76972 44.6859L7.47491 16.5744L7.47508 16.5742C7.47326 16.553 7.4726 16.5316 7.4726 16.5099C7.4726 16.0563 7.84098 15.6877 8.29856 15.6795L17.4264 15.6794C17.6502 9.84681 21.8978 5.19604 27.105 5.19604C32.3122 5.19604 36.5599 9.84681 36.7836 15.6794H45.8853H45.8982C46.3633 15.6794 46.7399 16.0511 46.7399 16.5099C46.7399 16.5242 46.7396 16.5384 46.7389 16.5526V16.5531L45.3202 44.7754L45.3073 45.0143C45.1358 46.9947 43.5125 48.5922 41.5086 48.6458Z"
            fill="white"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_162_3459">
            <rect
              width="39.387"
              height="43.607"
              fill="white"
              transform="translate(7.37671 5.19604)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: 2,
    name: "Tiktok",
    value: "TIKTOK",
    svg: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_162_1387)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.66 43.9631C2.72169 36.5355 8.50262 19.9984 22.2441 22.079V23.6107C10.6388 23.0938 5.53026 36.3503 11.66 43.9631ZM36.725 15.2755C38.137 16.356 40.0842 17.153 42.7684 17.3051V18.8056C39.7985 18.2802 37.9159 16.8667 36.725 15.2755ZM32.9988 7.37646C32.9969 7.93016 33.0719 8.52495 33.1666 9.06825H27.6881V35.1876C27.6881 36.3919 27.5588 37.4638 27.3013 38.4044C25.0704 43.1132 18.7542 42.4981 17.0088 39.2666C19.6072 40.8247 23.88 40.4108 25.6338 36.7126C25.8893 35.7739 26.0186 34.6996 26.0186 33.4958V7.37646H32.9988Z"
            fill="#00F7EF"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M34.6688 9.06812V9.10166C34.6707 9.70637 34.8557 18.4511 44.4388 18.9968C44.4388 27.132 44.4433 18.9968 44.4433 25.7535C43.7235 25.7946 38.1354 25.4077 34.6584 22.4375L34.6475 35.591C34.7334 41.5469 31.2711 47.3881 24.7892 48.5649C22.9732 48.8942 21.3378 48.9315 18.5928 48.357C2.77938 43.8273 8.03392 21.3674 23.912 23.7712C23.912 31.0221 23.9165 23.7693 23.9165 31.0221C17.357 30.098 15.1627 35.3236 16.9061 39.0648C18.4927 42.471 25.0235 43.2099 27.3017 38.4043C27.5598 37.4637 27.6885 36.3913 27.6885 35.1875V9.06812H34.6688Z"
            fill="white"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.244 23.6105C22.7852 23.6332 23.3422 23.6842 23.912 23.7707C23.912 31.0216 23.9164 23.7688 23.9164 31.0216C17.357 30.0975 15.1626 35.3231 16.9061 39.0643C16.9382 39.1323 16.9727 39.2003 17.0092 39.266C16.2292 38.7988 15.6017 38.1567 15.2366 37.3725C13.4957 33.6308 15.6876 28.4057 22.247 29.3293C22.2465 22.6846 22.244 28.2144 22.244 23.6105ZM42.7689 18.8054C43.2908 18.8975 43.8478 18.9632 44.4388 18.9968C44.4388 27.132 44.4432 18.9968 44.4432 25.7535C43.7235 25.7946 38.1354 25.4077 34.6584 22.4375L34.6475 35.591C34.7334 41.5469 31.2711 47.3881 24.7891 48.5649C22.9732 48.8942 21.3378 48.9315 18.5928 48.357C15.5026 47.4722 13.2204 45.8999 11.6599 43.9629C13.0502 45.1194 14.7951 46.0558 16.9253 46.6671C19.6673 47.2393 21.3032 47.2024 23.1192 46.8726C29.6012 45.6953 33.0634 39.8547 32.9795 33.9006L32.9884 20.7452C36.4655 23.7154 42.0535 24.1042 42.7758 24.0608C42.7753 17.7864 42.7689 24.3537 42.7689 18.8054ZM34.6687 9.06812V9.10166C34.6687 9.4574 34.7353 12.6147 36.7255 15.2754C34.3269 13.4376 33.4719 10.783 33.1665 9.06812H34.6687Z"
            fill="#FF004F"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_162_1387">
            <rect
              width="37.066"
              height="41.4267"
              fill="white"
              transform="translate(7.37671 7.37646)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: 3,
    name: "Lazada",
    value: "LAZADA",
    svg: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="12.2562"
          y="16.6155"
          width="30.5125"
          height="17.4357"
          fill="white"
        ></rect>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M39.8655 9.7733C40.8757 10.3306 47.7264 14.5224 48.0167 14.7082C48.5044 14.9984 48.7947 15.521 48.7947 16.0783V16.1015V31.0687V31.0919C48.7366 31.6376 48.3999 32.1137 47.9122 32.3343C47.7885 32.3914 47.0639 32.8387 45.956 33.5225C45.7124 33.6729 45.4503 33.8347 45.1719 34.0063C44.3182 34.5381 43.3122 35.1659 42.2208 35.8469C37.9982 38.4819 32.4982 41.914 29.601 43.6671C28.8114 44.1547 28.2076 44.5147 27.8941 44.7005C27.627 44.8514 27.3251 44.9327 27.0116 44.9327H26.9187C26.6401 44.9211 26.373 44.8398 26.1292 44.7005C24.9018 43.9912 19.5102 40.6379 14.6272 37.601C10.3177 34.9206 6.40428 32.4867 6.09944 32.3343C5.6466 32.1253 5.33309 31.7073 5.2402 31.2312C5.22859 31.2196 5.22859 31.1964 5.22859 31.1848C5.22859 31.1732 5.22568 31.1586 5.22278 31.1441C5.21988 31.1296 5.21698 31.1151 5.21698 31.1035C5.21698 31.0987 5.21498 31.0919 5.21265 31.0839C5.20935 31.0726 5.20536 31.059 5.20536 31.0454V16.1944C5.20536 16.1248 5.20536 16.0667 5.21698 15.997C5.2402 15.4745 5.50726 14.9984 5.9485 14.7082L6.07622 14.6385C7.72504 13.6051 13.2521 10.2378 14.1346 9.75008C14.3319 9.63396 14.5642 9.56429 14.7964 9.56429C15.0054 9.56429 15.226 9.62235 15.4234 9.72685C15.4234 9.72685 23.1566 14.7662 24.341 15.2074C25.1654 15.5906 26.0711 15.7764 26.9884 15.7648C28.0334 15.788 29.0552 15.5442 29.9609 15.0449C30.6499 14.683 33.5827 12.853 35.8398 11.4447C37.3487 10.5032 38.5556 9.75008 38.5882 9.75008C38.774 9.64557 38.983 9.58752 39.2036 9.58752C39.4358 9.58752 39.6681 9.65719 39.8655 9.7733ZM13.2056 32.1253H19.8938V29.7914H15.6556V17.9594H13.194L13.2056 32.1253ZM28.9159 32.1485H31.215V21.7215H28.9159V23.1148C28.1147 22.093 26.8839 21.5008 25.5834 21.5125C22.727 21.5125 20.5557 23.9509 20.5557 26.935C20.5557 29.9191 22.727 32.3575 25.5834 32.3575C26.8839 32.3808 28.1147 31.777 28.9159 30.7551V32.1485ZM33.0031 32.1485H41.5491H41.5607V30.0701H35.9873L41.433 23.5677V21.7331H33.0844V23.8115H38.4721L33.0031 30.3371V32.1485ZM22.9126 26.935C22.9126 25.0656 24.1434 23.6025 26.0012 23.6025C27.8591 23.6025 29.0899 25.054 29.0899 26.935C29.0899 28.8045 27.8358 30.2675 26.0012 30.2675C24.1666 30.2675 22.9126 28.8045 22.9126 26.935Z"
          fill="url(#paint0_linear_1_14)"
        ></path>
        <defs>
          <linearGradient
            id="paint0_linear_1_14"
            x1="53.1536"
            y1="7.38483"
            x2="6.29509"
            y2="43.346"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FA00F0"></stop>
            <stop offset="0.53125" stop-color="#F01D46"></stop>
            <stop offset="1" stop-color="#F57700"></stop>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 4,
    name: "Tiki",
    value: "TIKI",
    svg: (
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.1751 18.4886C18.0838 18.4886 16.3882 16.8009 16.3882 14.719C16.3882 14.3762 16.435 14.0446 16.5212 13.729H23.8289C23.915 14.0446 23.9619 14.3762 23.9619 14.719C23.962 16.8009 22.2665 18.4886 20.1751 18.4886ZM20.1751 9.55713C17.4771 9.55713 15.2899 11.7343 15.2899 14.42C15.2899 17.1057 17.4771 19.2829 20.1751 19.2829C22.8731 19.2829 25.0603 17.1057 25.0603 14.42C25.0603 11.7343 22.8731 9.55713 20.1751 9.55713ZM18.2058 39.2519C18.2058 40.3925 19.1348 41.3171 20.2805 41.3171C21.4263 41.3171 22.3551 40.3925 22.3551 39.2521V23.1871C22.3551 22.0465 21.4263 21.1218 20.2805 21.1218C19.1346 21.1218 18.2058 22.0466 18.2058 23.1871V39.2519ZM42.0348 39.2519C42.0348 40.3925 42.9635 41.3171 44.1094 41.3171C45.2552 41.3171 46.1842 40.3925 46.184 39.2521V23.1871C46.184 22.0465 45.2552 21.1218 44.1094 21.1218C42.9635 21.1218 42.0348 22.0466 42.0348 23.1871V39.2519ZM15.2792 21.2826H4.98035C3.89545 21.2826 3.01596 22.158 3.01596 23.238C3.01596 24.318 3.89545 25.1934 4.98035 25.1934H8.10185V39.2973C8.10185 40.3773 8.98134 41.2528 10.0662 41.2528H10.2551C11.34 41.2528 12.2195 40.3772 12.2195 39.2973V25.1934H15.2792C16.3641 25.1934 17.2436 24.318 17.2436 23.238C17.2437 22.158 16.3642 21.2826 15.2792 21.2826ZM29.1029 34.3867C29.1026 33.7247 29.1023 33.0594 29.1023 32.3896C29.3596 32.408 29.4664 32.5412 29.5636 32.6624C29.5873 32.692 29.6104 32.7208 29.6349 32.7471C30.3596 33.5236 31.0816 34.3026 31.8036 35.0816L31.8037 35.0817L31.8039 35.0819C32.7259 36.0767 33.648 37.0715 34.5755 38.0612L34.8095 38.3112C35.5961 39.1516 36.384 39.9935 37.2232 40.7796C37.8658 41.3813 38.9859 41.4168 39.7605 40.9884C40.5384 40.5584 40.7167 39.8582 40.6267 39.0485C40.5579 38.4284 40.1801 37.9741 39.7666 37.5446L34.3234 31.8908C33.0108 30.5271 33.011 30.5269 34.3308 29.251L34.3532 29.2293C35.8097 27.8211 37.2585 26.4049 38.6938 24.9755C39.2345 24.4369 39.7375 23.8473 39.6814 23.0112C39.6255 22.1798 39.1971 21.5935 38.4086 21.2906C37.5211 20.9496 36.7407 21.1451 36.0966 21.8212C34.9901 22.9827 33.889 24.1492 32.788 25.3158C32.1901 25.9492 31.5923 26.5827 30.9935 27.2153C30.6031 27.6279 30.2103 28.0381 29.7755 28.492L29.7747 28.4928L29.7744 28.4931L29.7716 28.4961C29.5599 28.717 29.3383 28.9484 29.1023 29.1954C29.1023 28.5508 29.1025 27.9303 29.1027 27.3263C29.1032 25.9921 29.1037 24.7387 29.1016 23.4852C29.0989 21.9368 28.3697 21.1329 26.9842 21.1411C25.6911 21.1487 24.8986 22.0121 24.8966 23.4645C24.8895 28.6563 24.8886 33.8484 24.8971 39.0405C24.8996 40.4853 25.6296 41.2445 26.9672 41.2532C28.3315 41.2621 29.0979 40.4608 29.101 39.0062C29.1043 37.4727 29.1036 35.9391 29.1029 34.3879V34.3873V34.3867ZM40.355 14.719C40.355 16.8009 42.0504 18.4886 44.1419 18.4886C46.2333 18.4886 47.9286 16.8009 47.9286 14.719C47.9286 14.3762 47.8818 14.0446 47.7956 13.729H40.488C40.4018 14.0446 40.355 14.3762 40.355 14.719ZM39.2567 14.42C39.2567 11.7343 41.4439 9.55713 44.1419 9.55713C46.8398 9.55713 49.027 11.7343 49.0269 14.42C49.0269 17.1057 46.8398 19.2829 44.1419 19.2829C41.4439 19.2829 39.2567 17.1057 39.2567 14.42Z"
          fill="white"
        ></path>
      </svg>
    ),
  },
];
class ModalChooseEcommerce extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddConnect = async (platform) => {
    const { handleFetchListConnectEcommerce, store_code } = this.props;
    const platform_name = platform?.toLowerCase();
    const url = `${callUrl()}/store/ecommerce/connect/${platform_name}?store_code=${store_code}`;
    var intervalID, childWindow;

    var left = window.screen.width / 2;
    var top = window.screen.height / 2;

    childWindow = window.open(
      url,
      `Kết nối với gian ${platform}`,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no,fullscreen=yes, top=${top}, left=${left}`
    );

    function checkWindow() {
      if (childWindow && childWindow.closed) {
        window.clearInterval(intervalID);
        window.$(".modal").modal("hide");
        handleFetchListConnectEcommerce("");
      }
    }
    intervalID = window.setInterval(checkWindow, 500);
  };
  render() {
    var { txtBonus, txtLimit } = this.state;
    return (
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        id="modalChooseEcommerce"
        data-keyboard="false"
        data-backdrop="static"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{
                backgroundColor: "#fff",
              }}
            >
              <h4
                class="modal-title"
                style={{
                  color: "#414141",
                }}
              >
                Kết nối với sàn TMĐT
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>

            <div>
              <div
                class="modal_ecommerce"
                style={{
                  display: "flex",
                  padding: "20px",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                {ecommerces.map((ecommerce) => (
                  <div
                    className="modal_ecommerce_item"
                    style={{
                      display: "flex",
                      columnGap: "20px",
                      color: "#fff",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor:
                          ecommerce.name === "Shopee"
                            ? "#ee4e2c"
                            : ecommerce.name === "Tiktok"
                            ? "#000"
                            : ecommerce.name === "Lazada"
                            ? "#262696"
                            : ecommerce.name === "Tiki"
                            ? "#33bbf3"
                            : "transparent",
                        width: "280px",
                        padding: "10px 0",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span>{ecommerce.svg}</span>
                      <span>Kết nối với {ecommerce.name}</span>
                    </div>
                    <div
                      className="btn btn-outline-primary"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "160px",
                      }}
                      onClick={() => this.handleAddConnect(ecommerce.name)}
                    >
                      Tạo kết nối
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    connectEcommerce: (platform, store_code, funcModal) => {
      dispatch(
        ecommerceAction.connectEcommerce(platform, store_code, funcModal)
      );
    },
  };
};
export default connect(null, mapDispatchToProps)(ModalChooseEcommerce);
