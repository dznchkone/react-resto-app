import React from 'react';
import './menu-list-item.scss';
import {Link} from "react-router-dom";

const MenuListItem = ({menuItem}) => {
    const {title, price, url, category, id} = menuItem;
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
        <li className="menu__item">
                <div className="menu__title"><Link to={`/${id}`}>{title}</Link></div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span> <i className={`fa fa-${icon}`}></i></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
                <button className="menu__btn">Add to cart</button>
        </li>
    )
}

export default MenuListItem;