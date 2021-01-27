import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux' 

function Admin () {
  const store = useSelector(store => store)
console.log("adming page",store)
useEffect(() => {

console.log(store)

}, 
[store]);

const [toggle, settoggle] = useState('false')

  return (
    <div >
<button >  </button>
    </div>

  );
};

export default Admin;
