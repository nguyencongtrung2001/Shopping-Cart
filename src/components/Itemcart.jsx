// src/components/Itemcart.js
import { useState } from "react";
import carts from "../data/carts";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../redux/actions/cartActions";
import { logout } from "../redux/actions/authActions";

function Itemcart() {
  // Đổi quantity trong data thành stock (tồn kho cố định)
  const [cartItems, setCartItems] = useState(
    carts.map((cart) => ({ ...cart, stock: cart.quantity, quantity: 1 })) // quantity là số lượng muốn mua, default 1
  );

  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const orders = useSelector((state) => state.cart.orders);

  // Hàm tăng số lượng muốn mua, không vượt quá stock
  const increase = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Hàm giảm số lượng muốn mua, không nhỏ hơn 1
  const decrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm mua hàng
  const handleBuy = (cart) => {
    if (cart.quantity <= cart.stock && cart.quantity > 0) {
      // Dispatch action thêm đơn hàng
      dispatch(
        addOrder({
          id: cart.id,
          name: cart.name,
          price: cart.price,
          boughtQuantity: cart.quantity,
          total: cart.price * cart.quantity,
        })
      );
      // Reset quantity về 1 sau khi mua
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cart.id ? { ...item, quantity: 1 } : item
        )
      );
    } else {
      alert("Số lượng mua phải nhỏ hơn hoặc bằng tồn kho và lớn hơn 0!");
    }
  };

  return (
    <>
      <div className="header">
        <h1>Xin chào, {username}</h1>
        <button onClick={() => dispatch(logout())}>Đăng xuất</button>
      </div>
      <div className="item-card">
        {cartItems.map((cart) => (
          <div className="card" key={cart.id}>
            <img src={cart.image} alt={cart.name} className="card-image" />
            <h2>{cart.name}</h2>
            <div className="card-details">
              <p className="card-price">
                {cart.price.toLocaleString("vi-VN")} VND
              </p>
              <p className="card-quantity">Tồn kho: {cart.stock}</p> {/* Hiển thị stock cố định */}
              <p className="card-quantity">Số lượng mua: {cart.quantity}</p>
              <p className="card-total">
                Tổng: {(cart.price * cart.quantity).toLocaleString("vi-VN")} VND
              </p>
            </div>
            <div className="card-actions">
              <button className="btn-quantity" onClick={() => decrease(cart.id)}>
                -
              </button>
              <span>{cart.quantity}</span>
              <button className="btn-quantity" onClick={() => increase(cart.id)}>
                +
              </button>
            </div>
            <button className="btn-buy" onClick={() => handleBuy(cart)}>
              Mua ngay
            </button>
          </div>
        ))}
      </div>
      {/* Phần hiển thị đơn hàng ở dưới */}
      <div className="orders-section">
        <h2>Đơn hàng đã mua</h2>
        {orders.length === 0 ? (
          <p>Chưa có đơn hàng nào.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                {order.name} - Số lượng: {order.boughtQuantity} - Tổng: {order.total.toLocaleString("vi-VN")} VND
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Itemcart;