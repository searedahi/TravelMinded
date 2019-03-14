import React, { Component } from 'react';
import ProductsContainer from '../containers/ProductsContainer';
import CartContainer from '../containers/CartContainer';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h2>Shopping Cart Example</h2>
                <hr />
                <ProductsContainer />
                <hr />
                <CartContainer />
            </div>
        );
    }
}