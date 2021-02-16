import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, calcTotalPrice} from '../../actions';
import WithRestoService from '../hoc';


const CartTable = ({items, deleteFromCart, calcTotalPrice, RestoService}) => {

    const btnOrder = !(items.length === 0)? <div className="cart__order" onClick={()=>RestoService.postOrder(items)}>Заказать</div>: null;
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map((item, i)=>{
                        let counter=0;
                        for (const elem of items) {
                            if(item.id === elem.id) counter++;
                        }
                        const {title, price, url, orderId} = item;
                        if (counter ===1 || i === items.findIndex(elem=> elem.id === item.id)) {
                                return (
                                    <div className="cart__item" key={orderId}>
                                        <img className="cart__item-img" src={url} alt={title}></img>
                                        <div className="cart__item-counter">X{counter}</div>
                                        <div className="cart__item-title">{title}</div>
                                        <div className="cart__item-price">Price: {price}$</div>
                                        <div className="cart__item-price">Total: {price*counter}$</div>
                                        <div className="cart__close" onClick={()=> {
                                            deleteFromCart(orderId);
                                            calcTotalPrice()
                                        }}>&times;</div>
                                    </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
            {btnOrder}
        </>
    );
}

const mapStateToProps = ({items}) =>{
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    calcTotalPrice,
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));