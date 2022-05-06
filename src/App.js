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
            <div class="fixed-top top-header"><h1>Summary</h1></div>
            <div class="bottom-part">
            <div className="tab">
                <h3>Orders</h3>
            <div className="top-table">
                <Table className="table table-striped table-bordered table-hover table-fixed ">
                    <thead>
                    <tr>
                        <th class="col-md-2">#</th>
                        <th class="col-md-3">Date</th>
                        <th class="col-md-4">Order Name</th>
                        <th class="col-md-3">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            return (
                                <tr onClick={() => setItemData(item)}>
                                    <td class="col-md-2">{index + 1}</td>
                                    <td class="col-md-3">{item.date}</td>
                                    <td class="col-md-4">{item.name}</td>
                                    <td class="col-md-3">{item.amount}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
            </div>
            <div class="order-data">
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
        </div>
    );
}

export default App;
