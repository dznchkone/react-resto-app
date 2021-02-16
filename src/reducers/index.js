const initialState = {
    menu: [ ],
    loading: true,
    error: false,
    items: [

    ],
    total: 0
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'MENU_LOAD_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const  item = state.menu.find((item)=> item.id === id);
            const orderId = Date.now().toString();
            const newItem = {
                price: item.price,
                title: item.title,
                url: item.url,
                id: item.id,
                orderId
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            //const newItems = state.items.filter(item=> item.id !== idx);
            const itemIndex = state.items.findIndex(item => item.orderId === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex+1)
                ]
            };
        case 'CALC_TOTAL_PRICE':
            let totalPrice = state.items.map(item=>item.price).reduce((sum, next)=>sum+next,0);
            return {
                ...state,
                total: totalPrice
            }
        default :
            return state;
    }
}

export default reducer;