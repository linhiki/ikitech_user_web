import React, { Component } from "react";
import { Link } from "react-router-dom";
import getChannel, { IKIPOS } from "../../ultis/channel";
import * as Env from "../../ultis/default"

class BadgeTable extends Component {
    constructor(props) {
        super(props);
    }


    buildBagesIkitech() {
        var { store_code, badges } = this.props
        var numOrderWaiting = badges.orders_waitting_for_progressing
        var numOrderPacking = badges.orders_packing
        var numOrderShipping = badges.orders_shipping
        var numUnread = badges.chats_unread
        var numVoucher = badges.voucher_total
        var numDiscount = badges.products_discount
        var numReview = badges.reviews_no_process


        var statusOrderWaiting = numOrderWaiting == 0 || numOrderWaiting == null ? "hide-badge" : "active-badge"
        var statusOrderPacking = numOrderPacking == 0 || numOrderPacking == null ? "hide-badge" : "active-badge"
        var statusOrderShipping = numOrderShipping == 0 || numOrderShipping == null ? "hide-badge" : "active-badge"
        var statusUnread = numUnread == 0 || numUnread == null ? "hide-badge" : "active-badge"
        var statusVoucher = numVoucher == 0 || numVoucher == null ? "hide-badge" : "active-badge"
        var statusDiscount = numDiscount == 0 || numDiscount == null ? "hide-badge" : "active-badge"
        var statusReview = numReview == 0 || numReview == null ? "hide-badge" : "active-badge"


        return (
            <div class="form-group" style={{ fontSize: "15px" }}>
                <div class="info-badge" >
                    <p class="" id="sale_user_name">
                        <Link to={`/order/${store_code}/WAITING_FOR_PROGRESSING`}>Đơn hàng đang chờ xử lý </Link> <span id="user_name">
                            <span

                                className={`step num-badge ${statusOrderWaiting}`}
                            >
                                {numOrderWaiting}
                            </span>

                        </span>
                    </p>
                    <p class="" id="delivery_address">
                        <Link to={`/order/${store_code}/PACKING`}>Đơn hàng đang chuẩn bị</Link> <span id="user_address">
                            <span

                                className={`step num-badge ${statusOrderPacking}`}
                            >
                                {numOrderPacking}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/order/${store_code}/SHIPPING`}> Đơn hàng đang giao</Link> <span id="user_tel">
                            <span

                                className={`step num-badge ${statusOrderShipping}`}
                            >
                                {numOrderShipping}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/chat/${store_code}`}>Tin nhắn chưa đọc </Link><span id="user_tel">
                            <span

                                className={`step num-badge ${statusUnread}`}
                            >
                                {numUnread}
                            </span>
                        </span>
                    </p>
                    <p class="" id="booking_time">
                        <Link to={`/voucher/${store_code}`}> Tổng voucher </Link><span id="booking_time_txt">
                            <span

                                className={`step num-badge ${statusVoucher}`}
                            >
                                {numVoucher}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/discount/${store_code}`}> Giảm giá sản phẩm </Link><span id="user_note">
                            <span

                                className={`step num-badge ${statusDiscount}`}
                            >
                                {numDiscount}
                            </span>
                        </span>
                    </p>

                    <p class="">
                        <Link to={`/review/${store_code}`}>Chưa đánh giá</Link>
                        <span class="cart_payment_method">
                            <span

                                className={`step num-badge ${statusReview}`}
                            >
                                {numReview}
                            </span>
                        </span>
                    </p>

                </div>
            </div>

        );
    }

    buildBagesPos() {
        var { store_code, badges } = this.props

        var { total_orders_in_day,
            temporary_order,
            orders_refunds,
            total_product_or_discount_nearly_out_stock,
            voucher_total,
            combo_total,
            products_discount
        } = badges




        var statusTotalOrdersInDay = total_orders_in_day == 0 || total_orders_in_day == null ? "hide-badge" : "active-badge"
        var statusTemporaryOrder = temporary_order == 0 || temporary_order == null ? "hide-badge" : "active-badge"
        var statusOrdersRefunds = orders_refunds == 0 || orders_refunds == null ? "hide-badge" : "active-badge"
        var statusTotalProductOrDiscountNearlyOutStock = total_product_or_discount_nearly_out_stock == 0 || total_product_or_discount_nearly_out_stock == null ? "hide-badge" : "active-badge"
        var statusVoucherTotal = voucher_total == 0 || voucher_total == null ? "hide-badge" : "active-badge"
        var statusComboTotal = combo_total == 0 || combo_total == null ? "hide-badge" : "active-badge"
        var statusProductsDiscount = products_discount == 0 || products_discount == null ? "hide-badge" : "active-badge"

        return (
            <div class="form-group" style={{ fontSize: "15px" }}>
                <div class="info-badge" >
                    <p class="" id="sale_user_name">
                        <Link to={`/order/${store_code}`}>Đơn hàng trong ngày </Link> <span id="user_name">
                            <span

                                className={`step num-badge ${statusTotalOrdersInDay}`}
                            >
                                {total_orders_in_day}
                            </span>

                        </span>
                    </p>
                    <p class="" id="delivery_address">
                        <Link to={`/pos/${store_code}`}>Đơn lưu tạm</Link> <span id="user_address">
                            <span

                                className={`step num-badge ${statusTemporaryOrder}`}
                            >
                                {temporary_order}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/order/${store_code}/CUSTOMER_HAS_RETURNS`}> Đơn hoàn trả</Link> <span id="user_tel">
                            <span

                                className={`step num-badge ${statusOrdersRefunds}`}
                            >
                                {orders_refunds}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/product/index/${store_code}`}> Sản phẩm sắp hết hàng </Link><span id="user_tel">
                            <span

                                className={`step num-badge ${statusTotalProductOrDiscountNearlyOutStock}`}
                            >
                                {total_product_or_discount_nearly_out_stock}
                            </span>
                        </span>
                    </p>
                    <p class="">
                        <Link to={`/discount/${store_code}`}> Giảm giá đang diễn ra </Link><span id="user_note">
                            <span

                                className={`step num-badge ${statusProductsDiscount}`}
                            >
                                {products_discount}
                            </span>
                        </span>
                    </p>
                    <p class="" id="booking_time">
                        <Link to={`/voucher/${store_code}`}> Voucher đang diễn ra </Link><span id="booking_time_txt">
                            <span

                                className={`step num-badge ${statusVoucherTotal}`}
                            >
                                {voucher_total}
                            </span>
                        </span>
                    </p>


                    <p class="" id="booking_time">
                        <Link to={`/combo/${store_code}`}> Combo đang diễn ra </Link><span id="booking_time_txt">
                            <span

                                className={`step num-badge ${statusComboTotal}`}
                            >
                                {combo_total}
                            </span>
                        </span>
                    </p>

                </div>
            </div>

        );
    }

    render() {

        if (getChannel() == IKIPOS) {
            return this.buildBagesPos()
        }

        return (
            this.buildBagesIkitech()
        );
    }
}

export default BadgeTable;
