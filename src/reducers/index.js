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
        case 'FETCH_DATA':
            return {
                state
            }
        case 'FETCH_DATA_SUCCESS':
            return {
                data: action.payload,
            }
        case 'FETCH_DATA_ERROR':
            return {
                state
            }
      case 'MOVE_ITEM':
        return  onMove(state, action.payload)
      
      default:
        return state;
    }
  };
  
  export default reducer;