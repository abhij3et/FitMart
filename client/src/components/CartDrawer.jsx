// src/components/CartDrawer.jsx
import { fmt } from "../utils/formatters"; // You might need to move the fmt function to a utils file

function CartDrawer({ isOpen, onClose, cart, cartCount, cartTotal, updateQty, removeFromCart }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay fixed inset-0 bg-black/30 z-50 ${isOpen ? "show" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className={`cart-slide fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col ${isOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-['DM_Serif_Display'] text-lg text-stone-900">
            Cart {cartCount > 0 && <span className="text-stone-400 text-base">({cartCount})</span>}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 gap-3">
              <span className="text-4xl">🛒</span>
              <p className="text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-xs text-stone-500 underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start py-4 border-b border-stone-100 last:border-0">
                  <div className="w-14 h-14 bg-stone-100 rounded-xl flex items-center justify-center text-xl shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      (item.category === "Nutrition" ? "🧴" : item.category === "Wearables" ? "⌚" : "🏋️")
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400">{item.brand}</p>
                    <p className="text-sm font-medium text-stone-900 leading-snug">{item.name}</p>
                    <p className="text-sm text-stone-700 mt-1">{fmt(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-300 hover:text-stone-500 text-xs transition-colors"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-2 border border-stone-200 rounded-full px-2 py-0.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="text-stone-500 hover:text-stone-900 w-4 text-sm"
                      >
                        −
                      </button>
                      <span className="text-xs text-stone-800 min-w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="text-stone-500 hover:text-stone-900 w-4 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium text-stone-900">{fmt(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-stone-400">Shipping calculated at checkout</p>
            <button className="w-full bg-stone-900 text-white text-sm py-3.5 rounded-full hover:bg-stone-700 transition-colors">
              Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;