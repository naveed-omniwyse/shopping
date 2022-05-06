import logo from './logo.svg';
import './App.css';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import orders from "./orders";

function App() {
    const [items, setItems] = useState([]);
    const [itemData, setItemData] = useState({});
    useEffect(() => {
        setItems(orders);
        if (orders.length > 0) {
            setItemData(orders[0]);
        }
    }, []);
    return (
        <div className="App">
            <h1>Summary</h1>
            <div className="tab">
                <h3>Orders</h3>
            <div className="box">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Order Name</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            return (
                                <tr onClick={() => setItemData(item)}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            </div>
            <div>
                <h3>Order Data</h3>
                {
                    itemData !== {} &&
                    <div className="tab">
                        <div>Name : {itemData.name}</div>
                        <div>Date : {itemData.date}</div>
                        <div>Total Amount : {itemData.amount}</div>
                        {
                            itemData.items && itemData.items.length > 0 &&
                            <div className="box">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        itemData.items.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.itemName}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        }


                    </div>
                }
            </div>
        </div>
    );
}

export default App;
