import './App.css';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
// import orders from "./orders";
import data from "./data.json";

function App() {
    const [items, setItems] = useState([]);
    const [itemData, setItemData] = useState({});
    const [editable, setEditable] = useState(false);
    const [orderIndex, setOrderIndex] = useState(0);
    const [orderItemIndex, setOrderItemIndex] = useState(0);
    useEffect(() => {
        const orders = JSON.parse(JSON.stringify(data));
        setItems(orders);
        if (orders.length > 0) {
            setItemData(orders[0]);
        }
    }, []);
    const enableEdit = () => {
        setEditable(true);
    }
    const saveChanges = () => {
        //save date to backend or into file
        setEditable(false);
    }
    const makeEditable = (event) => {
        if (editable) {
            var val = event.target.innerHTML;
            var input = document.createElement("input");
            input.value = val;
            input.style.height = "20px";
            input.onblur = function (ev) {
                ev.stopPropagation();
                var val = this.value;
                event.target.innerHTML = val;
                const obj = items;
                const closest = event.target.closest('div');
                const fieldName = event.target.attributes['data-name'].value;
                if (closest.className === 'top-table') {
                    obj[orderIndex][fieldName] = val;
                } else {
                    obj[orderIndex]['items'][orderItemIndex][fieldName] = val;
                }
                setItems(obj);
                setItemData(prev => ({...prev, ...obj[orderIndex]}));
            }
            event.target.innerHTML = "";
            event.target.appendChild(input);
            input.focus();
            input.onkeydown = function (e) {
                e.stopPropagation();
                if (e.keyCode === 13) {
                    input.blur();
                }
            };
        }
    }
    const selectItem = (item, index) => {
        setItemData(item);
        setOrderIndex(index);
    }
    return (
        <div className="App">
            <div class="fixed-top top-header">
                <h1>Summary</h1>
                <button style={{display: !editable ? 'block' : 'none'}} onClick={enableEdit}>Make Editable</button>
                <button style={{display: editable ? 'block' : 'none'}} onClick={saveChanges}>Save Changes</button>
            </div>
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
                                        <tr onClick={() => selectItem(item, index)}>
                                            <td class="col-md-2" data-name="index">{index + 1}</td>
                                            <td class="col-md-3" data-name="date">{item.date}</td>
                                            <td class="col-md-4" data-name="name" data-value-type="text"
                                                onDoubleClick={makeEditable}>{item.name}</td>
                                            <td class="col-md-3" data-name="amount" data-value-type="number"
                                                onDoubleClick={makeEditable}>{item.amount}</td>
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
                                                    <tr onClick={() => setOrderItemIndex(index)}>
                                                        <td>{index + 1}</td>
                                                        <td data-name="itemName" data-value-type="text"
                                                            onDoubleClick={makeEditable}>{item.itemName}</td>
                                                        <td data-name="price" data-value-type="number"
                                                            onDoubleClick={makeEditable}>{item.price}</td>
                                                        <td data-name="quantity" data-value-type="number"
                                                            onDoubleClick={makeEditable}>{item.quantity}</td>
                                                        <td data-name="total">{item.total}</td>
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
