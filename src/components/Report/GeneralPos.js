import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { filter_var } from "../../ultis/helpers"
import * as notificationAction from "../../actions/notification";
import { connect } from "react-redux";
import getChannel, { IKITECH } from "../../ultis/channel";
import { format } from "../../ultis/helpers";

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtPassword: "",
            txtOTP: "",
        };
    }


    fetchNotification = () => {
        window.$('.notification-toggle').dropdown('toggle');

        this.props.fetchAllNotification(this.props.store_code);

    }

    render() {
        var { store_code, badges, store } = this.props
        var {

            total_product_or_discount_nearly_out_stock,

        } = badges
        var total_products = filter_var(store.total_products)
        var total_posts = filter_var(store.total_posts)
        var total_customers = filter_var(store.total_customers)

        console.log(badges)

        return (

            <div className="row">

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-success text-uppercase mb-1" to={`/order/${store_code}`}>Doanh thu ngày</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{format(badges.total_final_in_day)}</div>
                                </div>
                                <div className="col-auto">
                                    <i class="fas fa-money-bill text-gray-300 fa-2x"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className=" font-weight-bold text-primary text-uppercase mb-1">
                                        <Link to={`/order/${store_code}`}>Đơn hàng</Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{badges.total_orders_in_day}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-file-invoice fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>








                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        <Link className=" font-weight-bold text-warning text-uppercase mb-1" to={`/order/${store_code}`}>    Đơn hoàn trả

                                        </Link>

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800"></div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-money-bill-alt fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-secondary shadow h-100 py-2">
                        <div className="card-body set-padding">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div >
                                        <Link className=" font-weight-bold text-secondary text-uppercase mb-1" to={`/pos/${store_code}`}>Đơn lưu tạm
                                        </Link>
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{badges.temporary_order}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-receipt fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body set-padding ">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">

                                    <Link className=" font-weight-bold text-primary text-uppercase mb-1" to={`/product/index/${store_code}`}>Sản phẩm</Link>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_products}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body set-padding ">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">

                                    <Link className="font-weight-bold text-danger text-uppercase mb-1" to={`/product/index/${store_code}?is_near_out_of_stock=true`}> Sản phẩm sắp hết hàng</Link>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_product_or_discount_nearly_out_stock}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-boxes fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div>
                                        <Link className=" font-weight-bold text-warning text-uppercase mb-1" to={`/customer/${store_code}`}>    Khách hàng

                                        </Link>

                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{total_customers}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-user fa-2x text-gray-300"></i>
                                </div>
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
        fetchAllNotification: (store_code, page) => {
            dispatch(notificationAction.fetchAllNotification(store_code, page));
        },

    };
};
export default connect(null, mapDispatchToProps)(General);
