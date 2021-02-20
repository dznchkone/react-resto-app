const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    };
};

const menuLoadError = (e) => {
    console.error(e);
    return {
        type: 'MENU_LOAD_ERROR'
    }
}

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    };
};

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    };
};

const calcTotalPrice = () => {
    return {
        type: 'CALC_TOTAL_PRICE'
    };
};

export {
    menuLoaded,
    menuRequested,
    menuLoadError,
    addedToCart,
    deleteFromCart,
    calcTotalPrice
};