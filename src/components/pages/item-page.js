import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuLoadError, addedToCart, calcTotalPrice} from '../../actions';
import Spinner from '../spinner';
import Error from "../error";
import MenuListItem from '../menu-list-item';

import './item-page.scss'


class ItemPage extends Component {
    componentDidMount() {
        if (this.props.menuItems.length === 0) {
            this.props.menuRequested();

            const  {RestoService} = this.props;
            RestoService.getMenuItems()
                .then(res => this.props.menuLoaded(res))
                .catch(err => this.props.menuLoadError(err));
        }
    }

    render() {
        const {menuItems, loading, error, addedToCart, calcTotalPrice} = this.props;
        const item = menuItems.find(item=>+item.id === +this.props.match.params.id);
        if (error) {
            return <Error/>;
        }
        if (loading) {
            return <Spinner/>
        }
        return <View item={item} addedToCart={addedToCart} calcTotalPrice={calcTotalPrice}/>
    }
}

const View = ({item, addedToCart, calcTotalPrice}) => {
    return (
        <div className="wrap">
            <MenuListItem
                menuItem={item}
                onAddToCart={(id) =>{
                            addedToCart(id);
                            calcTotalPrice()
                }
            }/>
        </div>
    )

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

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));