import './App.css';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
// import orders from "./orders";
import data from "./data.json";

function App() {
    const [items, setItems] = useState([]);
    const [itemData, setItemData] = useState({});
    useEffect(() => {
        const orders = JSON.parse(JSON.stringify(data));
        setItems(orders);
        window.localStorage.setItem('data', JSON.stringify(orders));
        if (orders.length > 0) {
            setItemData(orders[0]);
        }
    }, []);
    const makeEditable = (event) => {
        var val = event.target.innerHTML;
        var input = document.createElement("input");
        input.value = val;
        input.style.height = "20px";
        input.onblur = function(ev){
            ev.stopPropagation();
            var val=this.value;
            event.target.innerHTML=val;
            const par = event.target.parentNode;
            const obj = items;
            const index = parseInt(par.childNodes[0].innerHTML) - 1;
            const updatedData = {name: par.childNodes[2].innerHTML, date: par.childNodes[1].innerHTML , amount: par.childNodes[3].innerHTML}
            obj[index] = {...obj[index], ...updatedData};
            Object.assign(data, obj);
            setItems(obj);
            setItemData(prev => {return {...prev, ...updatedData }});
        }
        event.target.innerHTML="";
        event.target.appendChild(input);
        input.focus();
        input.onkeydown = function(e){
            e.stopPropagation();
            if(e.keyCode == 13){
                input.blur();
            }
        };
    }
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
                                    <td class="col-md-2" onDoubleClick={makeEditable}>{index + 1}</td>
                                    <td class="col-md-3" onDoubleClick={makeEditable}>{item.date}</td>
                                    <td class="col-md-4" onDoubleClick={makeEditable}>{item.name}</td>
                                    <td class="col-md-3" onDoubleClick={makeEditable}>{item.amount}</td>
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
