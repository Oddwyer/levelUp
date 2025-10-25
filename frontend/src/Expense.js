// Import React Hook
import React, {useState, useEffect} from 'react';

// Import css File
import './Expense.css';

export default function Expense(props){
const msg = props.msg
return(
<div className="Expense">

</div>)

async function displayExpenses(){
  const data = await RestClient.getExpenses()
  Promise.then(data => console.log(`All expenses: ${JSON.stringify(data)}`))
}
}