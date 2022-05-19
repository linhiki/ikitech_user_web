import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productAction from "../../actions/product"
import * as profileAction from "../../actions/profile"
import * as posAction from '../../actions/post_order'
import { shallowEqual } from '../../ultis/shallowEqual'
import * as dashboardAction from "../../actions/dashboard"
import * as branchAction from "../../actions/branch"
import { removeSignNumber } from '../../ultis/helpers'
import { getBranchId, setBranchId } from '../../ultis/branchUtils'
import * as productApi from "../../data/remote/product";
import ModalBranch from './ModalBranch'
import ModalKeyboard from './ModalKeyboard'
import ModalDelete from './ModalDelete'
import KeyboardEventHandler from "react-keyboard-event-handler";
import { AsyncPaginate } from "react-select-async-paginate";
import CardProduct from './CardProduct'
import history from '../../history'
import getChannel, { IKITECH , IKIPOS } from "../../ultis/channel";





class Topbar extends Component {


    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            selectTap: -1,
            fullScreen: false,
            idCart: "",
            branchId: "",
            order_from : 2,
        }

        this.refSearchProduct = React.createRef()

    }
    componentDidMount() {
        const { store_code } = this.props
        const branch_id = localStorage.getItem("branch_id")
        this.props.listPosOrder(store_code, branch_id)
        this.props.fetchBranchStore(this.props.store_code);
        this.props.fetchUserId();



    }
    // componentWillUpdate(nextProps, nextState) {
    //     console.log("thay doi" , nextState)
    //     this.props.onNewChange(nextState)
    // }

    componentWillReceiveProps(nextProps) {

        // if(this.props.openShipment != nextProps.openShipment){
        //     console.log("da vao" ,nextProps.openShipment )
        //     this.setState({order_from : nextProps.openShipment? 3 : 2})
        // }

        
        if (!shallowEqual(nextProps.branchStore, this.props.branchStore)) {


            if (nextProps.branchStore != null && nextProps.branchStore.length > 0) {

                var branch_id = getBranchId()

                if (branch_id != null) {
                    this.setState({ branchId: branch_id })

                } else {
                    branch_id = nextProps.branchStore[0]?.id
                    setBranchId(branch_id)

                    this.setState({ branchId: branch_id })

                }
                const selectedBranch = this.props.branchStore.find(branch => branch.id == branch_id);
                this.props.changeBranch(selectedBranch)
            }

        }
        if ((this.props.randomFocus != nextProps.randomFocus) && nextProps.randomFocus != null) {
            if (this.refSearchProduct != null) {
                this.refSearchProduct.focus()
            }
        }

        if (!shallowEqual(this.props.listPos, nextProps.listPos)) {
            if (nextProps.listPos.length > 0) {
                this.props.handleCallbackTab(nextProps.listPos[0]?.id)
            } else {
                if (nextProps.listPos.length == 0) {
                    this.handleCreateTab()
                }
            }
            this.setState({ selectTap: -1 })

        }

        if (this.props.loadingCart == true && nextProps.loadingCart == false) {
            if (nextProps.listPos.length == 0) {
                this.handleCreateTab()
            }
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowEqual(nextState.branchId, this.state.branchId)) {
            const { store_code } = this.props
            const branch_id = localStorage.getItem("branch_id")
            this.props.listPosOrder(store_code, branch_id)
            this.props.fetchBranchStore(this.props.store_code);
            this.props.fetchUserId();
        }
        return true
    }

    handleDelete = (idCart) => {

        this.setState({ selectTap: -1, idCart: idCart })
    }
    handleCreateTab = () => {

        const branch_id = localStorage.getItem("branch_id")
        const { store_code } = this.props
        this.props.createOneTab(store_code, branch_id, null)


    }
    handleChooseTab = (id, index) => {
        this.setState({ selectTap: index })
        this.props.handleCallbackTab(id)
    }
    handleChooseTab1 = (id) => {
        this.setState({ selectTap: -1 })
        this.props.handleCallbackTab(id)
    }
    searchData = (e) => {
        e.preventDefault()
        var { store_code } = this.props;
        var { searchValue } = this.state;
        const limit = 12
        var params = `&search=${searchValue}&limit=${limit}`;
        this.setState({ numPage: 20 })
        const branch_id = localStorage.getItem('branch_id')
        this.props.fetchAllProductV2(store_code, branch_id, 1, params);
    };
    goBackHome = () => {
        var { store_code } = this.props;
        history.push(`/dashboard/${store_code}`)
        // window.location.href = "/";
    }

    onChangeSearch = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    fullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.setState({ fullScreen: true })
        } else {
            document.exitFullscreen()
            this.setState({ fullScreen: false })
        }

    }

    handleCallbackBrach = (branchId) => {
        this.setState({ branchId: branchId })

        const selectedBranch = this.props.branchStore.find(branch => branch.id == branchId);

        this.props.changeBranch(selectedBranch)


        window.location.reload();
    }


    loadProducts = async (search, loadedOptions, { page }) => {



        var { store_code } = this.props;
        var branch_id = getBranchId();

        const params = `&search=${search}`;
        const res = await productApi
            .fetchAllProductV2(store_code, branch_id, page, params);


        if (res.status != 200) {
            return {
                options: [],
                hasMore: false,
            }
        }

        return {
            options: res.data.data.data.map((i) => {
                return {
                    value: i.id,
                    label: `${i.name}`,
                    product: i
                };
            }),

            hasMore: res.data.data.data.length == 20,
            additional: {
                page: page + 1,
            },
        };
    };

    handleInfoProduct = (inventory, id, name, image, price, distributes, maxPrice, minPrice, priceDiscount, quayntity, quantityDistribute, product) => {

        if (distributes.length > 0) {
            window.$("#modalDetail").modal("show");
            this.setState({ isToggle: true })
            this.props.handleCallbackProduct({
                inventoryProduct: inventory, idProduct: id, nameProduct: name, imageProduct: image,
                priceProduct: price, distributeProduct: distributes,
                minPriceProduct: minPrice, maxPriceProduct: maxPrice, discountProduct: priceDiscount,
                quantityProduct: quayntity,
                quantityProductWithDistribute: quantityDistribute,
                product: product
            })
        } else {
            this.setState({ isToggle: false })
            this.props.handleCallbackPushProduct({
                nameProduct: name,
                element_id: "",
                product_id: id,
                reality_exist: 0, nameDistribute: "",
                nameElement: "",
                nameSubDistribute: "",
                priceProduct: price,
                stock: quayntity,
                product: product
            })
        }

    }
    _recordInput = (name, event) => {

        this.props.passKeyPress(event.key, event)
    }
    onChangeProduct = (selectValue) => {


        if (selectValue != null && selectValue.product != null) {
            var data = selectValue?.product
            this.handleInfoProduct(
                data.inventory,
                data.id,
                data.name,
                data.images,
                data.price, data.distributes,
                data.max_price, data.min_price,
                data.product_discount,
                data.quantity_in_stock,
                data.quantity_in_stock_with_distribute,
                data
            )
        }


    };

    handleKeyboard = (key, event) => {

        switch (key) {
            case "f3":
            case "F3":
                event.preventDefault()

                if (this.refSearchProduct != null) {
                    this.refSearchProduct.focus()
                }

                break;
            default:
                return;
        }
    };

    render() {
        var { listPos, branchStore, user, store_code, currentBranch } = this.props;
        var { idCart, selected_product_id } = this.state

        const formatOptionLabel = ({ value, label, product }) => {

            return <CardProduct isItemSearch={true} product={product} />
        };

        const customStyles = {
            menu: styles => ({
                ...styles,
                width: '600px',

            }),
            option: (provided, state) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                fontWeight: 200,
                padding: 20,
                color: "black",
            }),
        }

        return (
            <div className='controller-top'>

                <KeyboardEventHandler
                    handleKeys={["f3"]}
                    onKeyEvent={(key, e) => {
                        this.handleKeyboard(key, e)
                    }}
                />
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top header-pos">

                    <div class="navbar-nav" style={{
                        alignItems: "center",
                        width: "100%"
                    }}

                    >

                        <div className='group-controller-first'>

                            <div className='first-list-top-cart'>

                                <li class="nav-item"
                                    style={{ flex: 1 }}
                                >

                                    <div>
                                        <AsyncPaginate

                                            onKeyUp={(event) => {
                                                this._recordInput('onKeyUp', event);

                                            }}
                                            onKeyDown={(event) => {

                                                this._recordInput('onKeyUp', event);
                                            }}
                                            autoFocus
                                            selectRef={(ref) => {
                                                this.refSearchProduct = ref;
                                            }}
                                            noOptionsMessage={() => 'Không tìm thấy sản phẩm nào'}
                                            loadingMessage={() => 'Đang tìm...'}   //minor type-O here
                                            placeholder="(F3) Tìm kiếm sản phẩm"
                                            value={null}
                                            loadOptions={this.loadProducts}
                                            formatOptionLabel={formatOptionLabel}
                                            id="recipientReferences1"
                                            onChange={this.onChangeProduct}
                                            additional={{
                                                page: 1,
                                            }}
                                            styles={customStyles}
                                            debounceTimeout={500}
                                            isClearable
                                            isSearchable
                                        />
                                    </div>


                                </li>


                            </div>
                            <div className='cart-list-banner'>
                                <li class="nav-item">

                                    {
                                        listPos !== null && listPos.length > 0 ?
                                            <ul class="navbar-nav" style={{ alignItems: "center" }}>
                                                <li
                                                    onClick={() => this.handleChooseTab1(listPos[0].id)}
                                                    className={this.state.selectTap === -1 ? "activess nav-item item-cart-list" : 'nav-item item-cart-list'}
                                                >
                                                    <div className='tab-item'
                                                        style={{ marginRight: "5px" }}
                                                    >{listPos[0].name}</div>
                                                    {listPos.length > 1 && <i class='fa fa-window-close'
                                                        onClick={() => this.handleDelete(listPos[0].id)}
                                                        data-toggle="modal" data-target="#removeModal"
                                                    ></i>
                                                    }
                                                </li >
                                                {
                                                    listPos.slice(1, listPos.length).map((item, index) => {
                                                        return (
                                                            <li onClick={() => this.handleChooseTab(item.id, index)}
                                                                key={index} className={index === this.state.selectTap ? "activess nav-item item-cart-list" : 'nav-item item-cart-list'}
                                                            >
                                                                <div className='tab-item'

                                                                    style={{ marginRight: "5px" }}>{item.name}</div>
                                                                <i class='fa fa-window-close'
                                                                    onClick={() => this.handleDelete(item.id)} data-toggle="modal" data-target="#removeModal"></i>
                                                            </li >
                                                        )
                                                    })
                                                }
                                            </ul>
                                            : ""
                                    }

                                </li>
                            </div>
                        </div>

                        <div className='end-list-top-cart'>
                            <li className='nav-item add-cart' style = {{marginRight : "30px" }} onClick={() => this.handleCreateTab()}>
                                <div>
                                <i class='fas fa-plus' ></i>

                                </div>
                            </li>

                            <div style={{margin : "auto 0px"
                            }}>
                                <ul className="navbar-nav ml-auto" style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",

                                }}>
                                    <li title="Giao hàng" className={`nav-item add-cart ${getChannel() == IKITECH ? "" : "invisible"}`} onClick = {()=>this.props.handleOpenShipment(true)}>
                                        <i class="fas fa-shipping-fast" ></i>
                                    </li>
                                    
                                    <li className="nav-item dropdown no-arrow" style={{ margin: "0 10px", fontSize: "17px" }}>
                                        <div className='wrap-info' data-toggle="modal" data-target="#modalBranch" style={{ display: "flex", color: "white", cursor: "pointer" }}>
                                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                                            <span className="mr-2 small" style={{
                                                color: "white", marginLeft: "5px",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                            }}>
                                                {currentBranch?.name ?? "Chưa có chi nhánh"}
                                            </span>

                                        </div>
                                        <div className='wrap-info' style={{ display: "flex", color: "white" }}>
                                            <i class="fa fa-user-o" aria-hidden="true"></i>
                                            <span className="mr-2 small" style={{ color: "white", marginLeft: "5px" }}>
                                                {user.name}
                                            </span>
                                        </div>

                                    </li>

                                    <li className='nav-item' id='btn-full' style={{ color: "white", cursor: "pointer" }} onClick={this.fullScreen}>
                                        {!this.state.fullScreen ?
                                            <i class='fas fa-expand-arrows-alt fa-2x  add-cart'></i> :
                                            <i class='fas fa-compress-arrows-alt  add-cart'></i>
                                        }

                                    </li >

                                    <li className='nav-item' style={{
                                        color: "white", cursor: "pointer",
                                        marginRight: '10px'
                                    }} onClick={this.goBackHome}>
                                        <i class='fas fa-home fa-2x  add-cart'></i>
                                    </li>

                                    <li className='nav-item' style={{ margin: "0 0px" }}>
                                        <button className='btn' style={{ color: "white", border: "1px solid" }} data-toggle="modal" data-target="#modalKeyboard">Phím tắt</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </nav>
                <ModalBranch currentBranch={currentBranch} branchStore={branchStore} handleCallbackBrach={this.handleCallbackBrach} />
                <ModalKeyboard />
                <ModalDelete idCart={idCart} store_code={store_code} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listPos: state.posReducers.pos_reducer.listPosOrder,
        branchStore: state.storeReducers.store.branchStore,
        user: state.userReducers.user.userID,
        loadingCart: state.posReducers.pos_reducer.loadingCart,
        currentBranch: state.branchReducers.branch.currentBranch
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        listPosOrder: (store_code, branch_id) => {
            dispatch(posAction.listPosOrder(store_code, branch_id))
        },
        createOneTab: (store_code, branch_id, data) => {
            dispatch(posAction.createOneTab(store_code, branch_id, data))
        },
        fetchAllProductV2: (store_code, branch_id, page, params) => {
            dispatch(productAction.fetchAllProductV2(store_code, branch_id, page, params));

        },
        fetchBranchStore: (store_code) => {
            dispatch(dashboardAction.fetchBranchStore(store_code))
        },
        fetchUserId: () => {
            dispatch(profileAction.fetchUserId());
        },
        changeBranch: (branchData) => {
            dispatch(branchAction.changeBranch(branchData))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topbar)