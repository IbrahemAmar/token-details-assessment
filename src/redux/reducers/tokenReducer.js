import {
  FETCH_TOKEN_LIST_REQUEST,
  FETCH_TOKEN_LIST_SUCCESS,
  FETCH_TOKEN_LIST_FAIL,
  FETCH_TOKEN_DETAIL_REQUEST,
  FETCH_TOKEN_DETAIL_SUCCESS,
  FETCH_TOKEN_DETAIL_FAIL,
  CLEAR_TOKEN_DETAIL,
} from '../actions/tokenAction';

const initialState = {
  loading: false,
  tokenList: [],
  error: null,
  selectedTokenId: null,
  tokenDetail: null,
  detailLoading: false,
  detailError: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOKEN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenList: action.payload,
      };
    case FETCH_TOKEN_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TOKEN_DETAIL_REQUEST:
      return {
        ...state,
        selectedTokenId: action.payload,
        tokenDetail: null,
        detailLoading: true,
        detailError: null,
      };
    case FETCH_TOKEN_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        tokenDetail: action.payload,
      };
    case FETCH_TOKEN_DETAIL_FAIL:
      return {
        ...state,
        detailLoading: false,
        detailError: action.payload,
      };
    case CLEAR_TOKEN_DETAIL:
      return {
        ...state,
        selectedTokenId: null,
        tokenDetail: null,
        detailLoading: false,
        detailError: null,
      };
    default:
      return state;
  }
};

export default tokenReducer;
