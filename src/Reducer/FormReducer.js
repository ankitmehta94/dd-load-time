export default function formReducer(state,action){
    switch (action.type) {
        case "UPDATE_INPUT":
        const { value, key } = action.payload 
          return {
            ...state,
            [key]:value
          };
    
        case "ADD_ITEM":
          console.log(JSON.stringify(state))
          return state;
    
        // case "REMOVE_ITEM":
        //   return {
        //     ...state,
        //     items: state.items.filter(item => action.payload !== item)
        //   };
    
        default:
          return state;
      }
}
