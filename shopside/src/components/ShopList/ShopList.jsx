import React from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

function ShopList() {
  const state = useSelector((state) => state.addcard);
  console.log(state);
  return <div>ShopList</div>;
}

export default ShopList;
