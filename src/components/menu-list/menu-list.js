import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuLoadError, addedToCart, calcTotalPrice} from '../../actions';
import Spinner from '../spinner';
import Error from "../error";

import './menu-list.scss';



class MenuList extends Component {
    componentDidMount() {
        this.props.menuRequested();

        const  {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(err => this.props.menuLoadError(err));
    }


    render() {
        const {menuItems, loading, error, addedToCart, calcTotalPrice} = this.props;
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        const items = menuItems.map(menuItem=>{
            return <MenuListItem
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={(id) =>{
                    addedToCart(id);
                    calcTotalPrice()
                }
                }/>
        });
        return (
            <View items={items}/>
        )
    }
}
const mapStateToProps = state => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}
const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuLoadError,
    addedToCart,
    calcTotalPrice
};

const View = ({items})=>{
    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));