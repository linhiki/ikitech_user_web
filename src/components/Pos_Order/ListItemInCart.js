import React, { Component } from 'react'
import ItemInCart from './ItemInCart'
import * as posAction from '../../actions/post_order'
import { connect } from 'react-redux'
import { shallowEqual } from '../../ultis/shallowEqual'
import { getBranchId } from '../../ultis/branchUtils'

 class ListItemInCart extends Component {
     constructor(props){
         super(props)
         this.state ={
            modalAdd :{
                CartIds:"",
                productIds:"",
                lineItemIds:"",
                quantity:"",
                distributesProduct:[]   
            },
            modalSub :{
                CartIds:"",
                itemIds:"",
                productIds:"",
                quantity:"",
                distributesProduct:[]  
            },
            modalDelete:{
                CartIds:"",
                idCarts:"",
                productIds:"",
                lineIds:"",
                distributes:""
            }
         }
     }

     handleCallbackQuantity =(modal) =>{
         this.props.handleCallbackQuantity(modal)
     }
     handleDelete = (idCart,productId,lineId,distribute) =>{
         this.setState({modalDelete:{idCarts:idCart,productIds:productId,lineIds:lineId,distributes:distribute}})
         this.props.handleDelete()
     }
     addQuantity = (idProduct,lineItemId,quantity,distribute) =>{
        this.setState({modalAdd:{CartIds:this.props.idCart,productIds:idProduct,lineItemIds:lineItemId,quantity:quantity,distributesProduct:distribute}})
    }
    addQuantitys = (modal) =>{
        this.setState({modalAdd:{CartIds:this.props.idCart,productIds:modal.idProduct,lineItemIds:modal.lineItemId,quantity:modal.quantity,distributesProduct:modal.distribute}})
    }
    subQuantity = (CartId,idItem,idProduct,quantity,distribute) =>{
        this.setState({modalSub:{CartIds:CartId,itemIds:idItem,productIds:idProduct,quantity:quantity,distributesProduct:distribute}})
    }

    shouldComponentUpdate(nextProps, nextState) {
        var {store_code} = this.props
        const branch_id = getBranchId()

        if (!shallowEqual(nextState.modalDelete, this.state.modalDelete)) {
            
            var formData = {line_item_id:nextState.modalDelete.lineIds,product_id:nextState.modalDelete.productIds,quantity:0,distributes:nextState.modalDelete.distributes}
            this.props.destroyOneProduct(store_code,branch_id,nextState.modalDelete.idCarts,formData)
        }
        if(!shallowEqual(nextState.modalAdd,this.state.modalAdd) && nextState.modalAdd.quantity !== "" ){
            var formDataAdd = {line_item_id:nextState.modalAdd.lineItemIds, product_id:nextState.modalAdd.productIds,quantity:nextState.modalAdd.quantity,distributes:nextState.modalAdd.distributesProduct}
            this.props.updateQuantityLineItem(store_code,branch_id,this.props.idCart,formDataAdd)
        }
        if(!shallowEqual(nextState.modalSub,this.state.modalSub)){
            var formDataSub = {line_item_id:nextState.modalSub.itemIds, product_id:nextState.modalSub.productIds,quantity:nextState.modalSub.quantity,distributes:nextState.modalSub.distributesProduct}
            this.props.subQuantityProduct(store_code,branch_id,nextState.modalSub.CartIds,formDataSub)
        }
        return true
      }
    render() {
        var {listItemPos} = this.props
        
        return (
            <div className='list-group'>

                {listItemPos.info_cart?.line_items.map((item,index) =>{
                    return(
                        <ItemInCart key={item.id} item = {item} index ={index} addQuantity ={this.addQuantity} handleDelete ={this.handleDelete} subQuantity ={this.subQuantity} addQuantitys = {this.addQuantitys} />
                    )
                })}
            </div>
        )
    }
}


const mapDispatchToProps =(dispatch,props) =>{
    return {
        updateQuantityLineItem: (store_code,branch_id,idCart,data) =>{
            dispatch(posAction.updateQuantityLineItem(store_code,branch_id,idCart,data))
        },
        destroyOneProduct: (store_code,branch_id,idCart,data) =>{
            dispatch(posAction.destroyOneProduct(store_code,branch_id,idCart,data))
        },
        subQuantityProduct: (store_code,branch_id,idCart,data) =>{
            dispatch(posAction.subQuantityProduct(store_code,branch_id,idCart,data))
        },
    }
 }

export default connect(null,mapDispatchToProps) (ListItemInCart);