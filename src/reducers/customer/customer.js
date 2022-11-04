import * as Types from "../../constants/ActionType";

var initialState = {
  allCustomer: [],
  allCustomerByInferralPhone: [],
  customerID: {},
  type: [],
  isFromPosAndSave: false,
  customerCreated: {},
  pointHistory: [],
};

export const customer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case Types.FETCH_ALL_CUSTOMER:
      newState.allCustomer = action.data;
      return newState;
    case Types.FETCH_ALL_CUSTOMER_BY_INFERRAL_PHONE:
      newState.allCustomerByInferralPhone = action.data;
      return newState;
    case Types.FETCH_ID_CUSTOMER:
      newState.customerID = action.data;
      return newState;
    case Types.CREATED_CUSTOMER:
      newState.isFromPosAndSave = action.isFromPosAndSave;
      newState.customerCreated = action.data;
      return newState;
    case Types.FETCH_ALL_POINT_HISTORY:
      newState.pointHistory = action.data;
      return newState;
    default:
      return newState;
  }
};
