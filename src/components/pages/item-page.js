import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuLoadError} from '../../actions';
import Spinner from '../spinner';
import Error from "../error";

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
        const {menuItems, loading, error} = this.props;
        const item = menuItems.find(item=>+item.id === +this.props.match.params.id);
        if (error) {
            return <Error/>;
        }
        if (loading) {
            return <Spinner/>
        }
        return <View item={item}/>
    }
}

const View = ({item}) => {
    const {title, price, url, category} = item;
    let icon;
    switch (category) {
        case 'salads':
            icon = 'leaf';
            break;
        case 'pizza':
            icon = 'pizza-slice';
            break;
        case 'meat':
            icon = 'drumstick-bite';
            break;
        default:
            icon = 'leaf';
            break;
    }
    return (
        <div className="wrap">
            <li className="menu__item">
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span> <i className={`fa fa-${icon}`}></i></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <button className="menu__btn">Add to cart</button>
            </li>
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
    menuLoadError
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(ItemPage));