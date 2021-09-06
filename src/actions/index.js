const dataLoaded = (data) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: data
    }
}

const dataRequested = () => {
    return {
        type: 'FETCH_DATA'
    }
}

const dataError = () => {
    return {
        type: 'FETCH_DATA_ERROR'
    }
}

const onMove = props => {
    return {
        type: 'MOVE_ITEM',
        payload: props
    }
}

const fetchData = (dataService, dispatch) => () => {
    dispatch(dataRequested())
    dataService.getData()
        .then((data) => dispatch(dataLoaded(data)))
        .catch((err) => dispatch(dataError(err)))
}

export {
    fetchData,
    onMove
}