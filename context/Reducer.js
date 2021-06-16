const Reducer = (state, action) => {
  // console.log(action)
  switch (action.type) {

      case "SET_TOKEN":
        console.log(action)
        return {
          ...state,
          token: action.payload,
        };
      
      case "SET_ID":
        console.log(action)
        return {
          ...state,
          id_user: action.payload
        };

      case "SET_DAYS":
        console.log(action)
        return {
          ...state,
          days: action.payload
        }

    default:
      return state;
  }
};

export default Reducer;
