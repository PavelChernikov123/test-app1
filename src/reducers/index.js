import actionType from "../actions/action-type"

const initialState = {
    data: []    
}
    
  
const onMove = (state, payload) => {
    const {ids, from, to } = payload
    const {data} = state
    let updated = data;
    ids.map((id) => {
      const idx = updated[from].findIndex((item) => item.id === id)
      const currentItem = updated[from][idx]
      updated =  {
            ...updated,
            [from] :[
            ...updated[from].slice(0, idx),
            ...updated[from].slice(idx + 1)
            ] , 
            [to]: [...updated[to], currentItem]
      }
      return true
    })

    return {data : updated};
}

  

  const reducer = (state = initialState, action) => {
  
    switch (action.type) {
        case actionType.FETCH_DATA:
            return {
                state
            }
        case actionType.FETCH_DATA_SUCCESS:
            return {
                data: action.payload,
            }
        case actionType.FETCH_DATA_ERROR:
            return {
                state
            }
      case actionType.MOVE_ITEM:
        return  onMove(state, action.payload)
      
      default:
        return state;
    }
  };
  
  export default reducer;