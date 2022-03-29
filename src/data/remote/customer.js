import callApi from "../../ultis/apiCaller";

export const fetchAllCustomer = (
  store_code,
  page,
  params,
  referral_phone_number = ""
) => {
  return params
    ? callApi(
        `/store/${store_code}/customers?page=${page}${params}&referral_phone_number=${referral_phone_number}`,
        "get",
        null
      )
    : callApi(`/store/${store_code}/customers?page=${page}`, "get", null);
};

export const fetchCustomerId = (store_code, blogId) => {
  return callApi(`/store/${store_code}/customers/${blogId}`, "get", null);
};
