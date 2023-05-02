
import React from "react";

const transactionTableRow = (props) => {
    const {  name1,name2, amount} = props.obj;
    console.log(name1,"name1")
    return (
        <tr>
            <td>{name1}</td>
            <td>{name2}</td>
            <td>{amount}</td>
        </tr>
    )
}

export default transactionTableRow;