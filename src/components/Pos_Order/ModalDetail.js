import React, { Component } from 'react'
import { format } from '../../ultis/helpers'
import * as Env from "../../ultis/default"

class ModalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idElement:"",
            distributeName: "",
            distributeValue: "",
            element_distributes: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            afterPrice: "",
            priceBeforeDiscount: "",
            afterChoosePrice: "",
            elementObject: "",
            minPriceAfterDiscount: "",
            maxPriceAfterDiscount: "",
            stateDistribute: false,
            messageErr: "",
            quantityInStock: ""
        }
    }
    handleClick = (nameDistribute, nameObject, index, id, quatity) => {
        var { distributes } = this.props.modal.inventoryProduct
        this.setState({ distributeSelected: index, subElementDistributeSelected: -1, element_distributes: "", distributeValue: nameDistribute, distributeName: nameObject })
        if (distributes.length > 0) {
            if (distributes[0].element_distributes.length > 0) {
                if (distributes[0].element_distributes[0].sub_element_distributes.length > 0) {
                    var itemParents = distributes[0]
                    if (this.props.modal.discountProduct) {
                        var { value } = this.props.modal.discountProduct
                        var indexElement = itemParents.element_distributes.map(e => e.id).indexOf(id)
                        if (indexElement !== -1) {
                            var elment = itemParents.element_distributes[indexElement]
                            if (elment)
                                this.setState({
                                    elementObject: elment,
                                    messageErr: "",
                                })
                        }
                    } else {
                        var indexElements = itemParents.element_distributes.map(e => e.id).indexOf(id)
                        if (indexElements !== -1) {
                            var elments = itemParents.element_distributes[indexElements]
                            if (elments)
                                this.setState({
                                    elementObject: elments,
                                    messageErr: "",
                                
                                })
                        }
                    }
                } else {
                    var itemParent = distributes[0];
                    if (this.props.modal.discountProduct) {
                        var { value } = this.props.modal.discountProduct
                        var indexElement = itemParent.element_distributes.map(e => e.id).indexOf(id)
                        if (indexElement !== -1) {
                            var elment = itemParent.element_distributes[indexElement]
                            if (elment)
                                this.setState({
                                    elementObject: elment,
                                    afterChoosePrice: elment.cost_of_capital,
                                    priceBeforeDiscount: elment.price,
                                    quantityInStock: quatity,
                                    messageErr: "",
                                    idElement:id,
                                })
                        }
                    } else {

                        var indexElements = itemParent.element_distributes.map(e => e.id).indexOf(id)
                        if (indexElements !== -1) {
                            var elments = itemParent.element_distributes[indexElements]
                            if (elments)
                                this.setState({
                                    elementObject: elments,
                                    afterChoosePrice: elments.cost_of_capital,
                                    quantityInStock: quatity,
                                    messageErr: "",
                                    idElement:id,
                                })
                        }
                    }
                }
            }
        }

    }

    handleClickElement = (nameElement, price, index,id) => {
        var { sub_element_distributes } = this.state.elementObject
        if (this.props.modal.discountProduct) {
            var { value } = this.props.modal.discountProduct
            this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
            var indexDistribute = sub_element_distributes.map(e => e.name).indexOf(nameElement)
            var sub_element = sub_element_distributes[indexDistribute]
            this.setState({
                afterChoosePrice: sub_element.price - (sub_element.price * value / 100),
                priceBeforeDiscount: sub_element.price,
                quantityInStock: sub_element.stock, messageErr: "",
                idElement:id,
            })
        } else {
            if (sub_element_distributes) {
                this.setState({ subElementDistributeSelected: index, element_distributes: nameElement })
                var indexDistributes = sub_element_distributes.map(e => e.name).indexOf(nameElement)
                var sub_elements = sub_element_distributes[indexDistributes]
                this.setState({
                    afterChoosePrice: sub_elements.cost_of_capital,
                    priceBeforeDiscount: sub_elements.price,
                    quantityInStock: sub_elements.stock,
                    idElement:id,
                    messageErr: ""
                })
            } else {
                this.setState({ subElementDistributeSelected: index,idElement:id, element_distributes: nameElement })
            }

        }

    }
    handleClose = () => {
        this.setState({
            afterChoosePrice: "",
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
        })
    }
    handleCallback = () => {
        var info = this.props.modal
        const { distributeName, distributeValue, element_distributes, quantityInStock, idElement,afterChoosePrice,afterPrice } = this.state
        console.log("info",info)
        if (info.distributeProduct.length === 0) {
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                element_id: this.props.modal.idProduct,
                product_id: this.props.modal.idProduct,
                reality_exist: 0, nameDistribute: distributeName,
                nameElement: distributeValue,
                nameSubDistribute: element_distributes,
                priceProduct:afterPrice,
                stock: this.props.modal.inventoryProduct.main_stock
            })
            return
        }

        if (this.state.distributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].name}` })
            return
        }
        if (info.distributeProduct[0].element_distributes[0].sub_element_distributes.length === 0) {
            window.$('.modal').modal('hide');
            this.props.handleCallbackPushProduct({
                nameProduct: this.props.modal.nameProduct,
                product_id: this.props.modal.idProduct,
                element_id: idElement,
                reality_exist: 0, nameDistribute: distributeName,
                nameElement: distributeValue,
                nameSubDistribute: element_distributes,
                priceProduct:afterChoosePrice,
                stock: quantityInStock
            })
            this.setState({ distributeSelected: -1, messageErr: "", afterChoosePrice: "", element_distributes: "", distributeValue: "" })
            return
        }
        if (this.state.subElementDistributeSelected === -1) {
            this.setState({ messageErr: `Chưa chọn ${this.props.modal.distributeProduct[0].sub_element_distribute_name}` })
            return
        }

        window.$('.modal').modal('hide');

        this.props.handleCallbackPushProduct({
            nameProduct: this.props.modal.nameProduct,
            product_id: this.props.modal.idProduct,
            element_id: idElement,
            reality_exist: 0,
            nameDistribute: distributeName,
            nameElement: distributeValue,
            nameSubDistribute: element_distributes,
            priceProduct:afterChoosePrice,
            stock: quantityInStock
        })
        this.setState({
            distributeSelected: -1,
            subElementDistributeSelected: -1,
            messageErr: "",
            afterChoosePrice: "", element_distributes: "", distributeValue: ""
        })
    }
    componentWillReceiveProps(nextProps, nextState) {

        this.setState({ quantityInStock: nextProps.modal.inventoryProduct.main_stock })
        if (nextProps.modal.priceProduct !== this.state.afterPrice) {
            this.setState({ afterPrice: nextProps.modal.priceProduct })
        }
        var { minPriceProduct, maxPriceProduct, discountProduct } = nextProps.modal
        if (nextProps.modal.minPriceProduct !== this.props.modal.minPriceProduct) {
            if (discountProduct !== null) {
                var minPrice = minPriceProduct - (minPriceProduct * discountProduct.value / 100)
                var maxPrice = maxPriceProduct - (maxPriceProduct * discountProduct.value / 100)
                this.setState({ minPriceAfterDiscount: minPrice, maxPriceAfterDiscount: maxPrice })
            }

        }

    }
    render() {
        var inforProduct = this.props.modal
        var itemParent = inforProduct && inforProduct.inventoryProduct && inforProduct.inventoryProduct.distributes !== null && inforProduct.inventoryProduct.distributes.length > 0 ? inforProduct.inventoryProduct.distributes[0] : []
        return (
            <div class="modal" id="modalDetail">
                <div class="modal-dialog">
                    <div class="modal-content" >
                        <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                            <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chi tiết sản phẩm</p>
                            <button type="button" class="close" onClick={this.handleClose} data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" style={{ position: "relative" }}>
                        <button class="btn btn-info" onClick={this.handleCallback} style={{ backgroundColor: "green", position: "absolute", right: "15px", top: "20px", zIndex: "10000" }}>Thêm</button>
                            <div className='model-card row' style={{ margin: "5px", width: "80%" }}>
                                <div className='name-voucher col-4' style={{ width: "120px", height: "120px", padding: "8px" }}>
                                    <div style={{ justifyContent: "center", width: "100%", height: "100%", borderRadius: "0.25em", display: "flex", alignItems: "center" }}>
                                        <img src={inforProduct.imageProduct.length > 0 ? inforProduct.imageProduct[0].image_url : Env.IMG_NOT_FOUND} alt='' style={{ width: "100%" }}></img>
                                    </div>
                                </div>
                                <div className='info-voucher col-8' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                                    <div>
                                        <div className='value' style={{ fontWeight: "bold" }}>{inforProduct.nameProduct}</div>
                                        <div className='code' style={{ color: "red" }}><span>{this.state.afterChoosePrice === '' ? inforProduct.discountProduct === null ? format(Number(this.state.afterPrice)) : this.state.minPriceAfterDiscount === this.state.maxPriceAfterDiscount ? `${format(Number(this.state.minPriceAfterDiscount))}` : `${format(Number(this.state.minPriceAfterDiscount))} - ${format(Number(this.state.maxPriceAfterDiscount))}`
                                            : format(Number(this.state.afterChoosePrice))}</span></div>
                                        <div className='before-discout' style={{ display: "flex" }} >
                                            <span style={{ fontSize: "13px", textDecoration: "line-through" }}>{inforProduct.discountProduct !== null ?
                                                this.state.afterChoosePrice === "" ? inforProduct.minPriceProduct === inforProduct.maxPriceProduct ? format(Number(this.state.afterPrice)) : `${format(Number(inforProduct.minPriceProduct))} - ${format(Number(inforProduct.maxPriceProduct))}` : format(Number(this.state.priceBeforeDiscount)) : ""}</span>
                                            <div className='persen-discount' style={{ fontSize: "13px", marginLeft: "10px" }}>{inforProduct.discountProduct !== null ? `- ${inforProduct.discountProduct.value}%` : ""}</div>
                                        </div>
                                        <div className='quantity-product' style={{ fontWeight: "bold", fontSize: "13px" }}>
                                            {this.state.quantityInStock === -1 || this.state.quantityInStock === null ? "Còn hàng" : `Còn lại ${this.state.quantityInStock} sản phẩm`}
                                        </div>
                                    </div>
                                    <div>

                                        <div className='distribute'>
                                            {this.state.messageErr && (
                                                <div className='show-err' style={{ color: "red" }}>{this.state.messageErr}</div>
                                            )}
                                            <div className='wrap-distribute'>
                                                <div className='' style={{ display: "flex" }}>
                                                    <div className='distribute-name'>{itemParent.name}</div>
                                                </div>
                                                <div className='group-name'>{itemParent.element_distributes && itemParent.element_distributes.map((itemChild, index) => {
                                                    return <button className={index === this.state.distributeSelected ? "active" : ''} style={{ border: "1px solid #e4e4e4", borderRadius: "4px", marginRight: '10px', padding: "5px" }} onClick={() => this.handleClick(itemChild.name, itemParent.name, index, itemChild.id, itemChild.stock)}>{itemChild.name}</button>
                                                })}</div>
                                            </div>

                                            <div className='distribute-name'>{itemParent.sub_element_distribute_name}</div>
                                            <div className='element_distribute_name'>{itemParent.element_distributes &&  itemParent.element_distributes[0].sub_element_distributes.map((itemChild, index) => (
                                                <button className={index === this.state.subElementDistributeSelected ? "actives" : ""} style={{ border: "1px solid #e4e4e4", borderRadius: "4px", marginRight: '10px', padding: "5px" }} onClick={() => this.handleClickElement(itemChild.name, itemChild.price, index,itemChild.id)}>{itemChild.name}</button>
                                            ))}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default ModalDetail;