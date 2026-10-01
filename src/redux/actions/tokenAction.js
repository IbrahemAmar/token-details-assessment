// Action Type
export const FETCH_TOKEN_LIST_REQUEST = "FETCH_TOKEN_LIST_REQUEST";
export const FETCH_TOKEN_LIST_SUCCESS = "FETCH_TOKEN_LIST_SUCCESS";
export const FETCH_TOKEN_LIST_FAIL = "FETCH_TOKEN_LIST_FAIL";
export const FETCH_TOKEN_DETAIL_REQUEST = "FETCH_TOKEN_DETAIL_REQUEST";
export const FETCH_TOKEN_DETAIL_SUCCESS = "FETCH_TOKEN_DETAIL_SUCCESS";
export const FETCH_TOKEN_DETAIL_FAIL = "FETCH_TOKEN_DETAIL_FAIL";
export const CLEAR_TOKEN_DETAIL = "CLEAR_TOKEN_DETAIL";

// Action Creators
export const fetchTokenListRequest = () => ({
  type: FETCH_TOKEN_LIST_REQUEST,
});

export const fetchTokenListSuccess = (data) => ({
  type: FETCH_TOKEN_LIST_SUCCESS,
  payload: data,
});

export const fetchTokenListFail = (error) => ({
  type: FETCH_TOKEN_LIST_FAIL,
  payload: error,
});

export const fetchTokenDetailRequest = (id) => ({
  type: FETCH_TOKEN_DETAIL_REQUEST,
  payload: id,
});

export const fetchTokenDetailSuccess = (data) => ({
  type: FETCH_TOKEN_DETAIL_SUCCESS,
  payload: data,
});

export const fetchTokenDetailFail = (error) => ({
  type: FETCH_TOKEN_DETAIL_FAIL,
  payload: error,
});

export const clearTokenDetail = () => ({
  type: CLEAR_TOKEN_DETAIL,
});
