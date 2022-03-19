import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as OrderAction from '../../actions/add_order'
import * as Env from "../../ultis/default"
import { filter_arr, format } from '../../ultis/helpers'

class CardProduct extends Component {
    constructor(props){
        super(props)
        this.state ={
            product_id:""
        }
    }
    handleInfoProduct = (inventory,id,name,image,price,distributes,maxPrice,minPrice,priceDiscount,quayntity,quantityDistribute) =>{
        this.props.handleCallbackProduct({inventoryProduct:inventory,idProduct:id,nameProduct:name,imageProduct:image,
            priceProduct:price,distributeProduct:distributes,
            minPriceProduct:minPrice, maxPriceProduct:maxPrice,discountProduct:priceDiscount,
            quantityProduct:quayntity,
            quantityProductWithDistribute:quantityDistribute
})
    }
    showProduct = (products) =>{
        var result = null;
        if(products.length > 0){
            result = products.slice(0,12).map((data,index) =>{
                return (
                    <div class="col-sm-2" style={{marginBottom:"10px"}}>
                        <a data-toggle="modal" data-target="#modalDetail" onClick={() =>this.handleInfoProduct(data.inventory,data.id,data.name,data.images,data.price,data.distributes,data.max_price,data.min_price,data.product_discount,data.quantity_in_stock,data.quantity_in_stock_with_distribute)}>
                        <div class="card">
                                <img src= {data.images.length >0?data.images[0].image_url : Env.IMG_NOT_FOUND}className="img-responsive" alt="Image" width="100%" height="100px" />
                                <div class="card-body" style={{padding:'0'}}>
                                <p class="card-title" style={{margin:'0',overflow:"hidden",whiteSpace:"nowrap",textOverflow:'ellipsis'}}>{data.name}</p>
                                {data.product_discount?<>
                                    <p class="card-text" style={{fontSize:"10px",color:"red", margin:"0"}}>{data.min_price===data.max_price?`${format(Number(data.price - data.price* data.product_discount.value/100))}`:`${format(Number(data.min_price - data.min_price * data.product_discount.value/100))} - ${format(Number(data.max_price - data.max_price* data.product_discount.value/100))}`}</p>
                                    <p class="card-text" style={{fontSize:"10px",textDecoration:"line-through"}}>{data.min_price===data.max_price?`${format(Number(data.price))}`:`${format(Number(data.min_price))} -${format(Number(data.max_price))}`}</p>
                                </>:
                                <>
                                    <p class="card-text" style={{fontSize:"10px",color:"red"}}>{format(Number(data.price))}</p>
                                    <p class="card-text" style={{fontSize:"10px",textDecoration:"line-through"}}></p>
                                </>
                            }

                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
        }else{
            return result;
        }
        return result;
    }
    render() {
        var {products} = this.props
        var listProducts = filter_arr(products.data)
        console.log("listProducts",listProducts)
        return (
            <div className='show-product' style={{overflow:"hidden",overflowY:"auto"}}>
                <div className='row'>
                    {this.showProduct(listProducts)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducers.product.allProduct,
    };
};
const mapDispatchToProps = (dispatch,props) =>{
    return {
        createOrder: (store_code,data) =>{
            dispatch(OrderAction.createOrder(store_code,data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CardProduct);