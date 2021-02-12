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

export {
    menuLoaded,
    menuRequested,
    menuLoadError
};