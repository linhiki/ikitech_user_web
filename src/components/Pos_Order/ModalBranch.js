import React, { Component } from 'react'

class ModalBranch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtBranch: "",
            nameBranch:""
        }
    }

    showData = (stores) => {
        var result = null;
        var store_code = typeof this.props.store_code != "undefined" ? this.props.store_code : null
        if (stores.length > 0) {
            result = stores.map((data, index) => {
                var selected = data.store_code === store_code ? true : false
                return (
                    <option value={data.id} key={index} selected={selected} name = {data.name} >
                        {data.name}
                    </option>

                );
            });
        } else {
            return result;
        }
        return result;
    };
    onChange = (e) => {
        var value = e.target.value;
        var name = e.target.name
        localStorage.setItem('branch_id', value);
        this.setState({ txtBranch: value, nameBranch:name })

    };
    componentDidMount() {
        const branch_id = localStorage.getItem("branch_id")
        this.setState({ txtBranch: branch_id })
    }
    render() {
        const { branchStore } = this.props
        var { txtBranch,nameBranch } = this.state
        return (
            <div>
                <div class="modal" id="modalBranch">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className='model-header-modal' style={{ display: 'flex', justifyContent: "space-between", margin: "10px 15px" }}>
                                <p class="" style={{ margin: "0px", fontWeight: "bold" }}>Chọn chi nhánh</p>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div style={{ margin: 'auto' }} className={`nav-item dropdown no-arrow mx-1 `}>

                                    <select id="input" className="form-control border-input" name={nameBranch} value={txtBranch} onChange={this.onChange}>
                                        <option value="">-- Chọn chi nhánh --</option>
                                        {this.showData(branchStore)}
                                    </select>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-default"
                                    data-dismiss="modal"
                                >
                                    Thoát
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalBranch