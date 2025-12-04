"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-md mx-auto" data-testid="empty-cart">
          <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Add some products to get started
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10" data-testid="cart-title">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {items.map((item) => (
            <Card key={item.product.id} data-testid={`cart-item-${item.product.id}`}>
              <CardContent className="p-6 md:p-8">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1" data-testid={`cart-item-name-${item.product.id}`}>
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.category}
                    </p>
                    <p className="font-bold" data-testid={`cart-item-price-${item.product.id}`}>
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product.id)}
                      data-testid={`remove-item-${item.product.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        data-testid={`decrease-quantity-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 text-center h-8"
                        data-testid={`quantity-input-${item.product.id}`}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        data-testid={`increase-quantity-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="font-bold" data-testid={`item-subtotal-${item.product.id}`}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="subtotal">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="shipping">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span data-testid="tax">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span data-testid="total">
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full" data-testid="checkout-button">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/products" className="block mt-3">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
