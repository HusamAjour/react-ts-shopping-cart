import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';

type ShoppingCartProps = { isOpen: boolean };
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem {...item} key={item.id} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id == cartItem.id);
                return total + cartItem.quantity * (item?.price || 0);
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
