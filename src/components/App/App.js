import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({orders: data.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (order) => {
    order.id = this.state.orders.length+1
    console.log('order in App.js', order)
    this.setState({orders: [...this.state.orders, order]})
    postOrder(order)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
