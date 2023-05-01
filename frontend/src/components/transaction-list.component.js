import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TransactionTableRow from "./transactionTableRow";


const TransactionList =()=>{
    const [user, setUser] = useState([]);

    useEffect(()=>{
        axios.get(window.location.origin+'/users/transaction-history').then(({data})=>{
            setUser(data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    
    const DataTable = () => {
        
        return user.map((res,i)=>{
            return <TransactionTableRow obj={res} key={i} />
        });
    };
    
    return (
        <div className="table-wrapper">
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    )
}
export default TransactionList;