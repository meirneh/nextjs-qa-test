"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutFormData } from "@/types/product";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    // Don't redirect if we're completing an order or already processing
    if (items.length === 0 && !isCompletingOrder && !isProcessing) {
      router.push("/cart");
    }
  }, [items.length, router, isCompletingOrder, isProcessing]);

  if (items.length === 0 && !isCompletingOrder) {
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    // Personal Information Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // Address Validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    const zipRegex = /^\d{5}$/;
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!zipRegex.test(formData.zipCode)) {
      newErrors.zipCode = "ZIP code must be 5 digits";
    }

    // Payment Validation
    const cardRegex = /^\d{16}$/;
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardRegex.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format: MM/YY";
    }

    const cvvRegex = /^\d{3}$/;
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setIsCompletingOrder(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate new order number and store it
    const newOrderNumber = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    sessionStorage.setItem("orderNumber", newOrderNumber);
    
    // Clear cart before navigation (but isCompletingOrder flag prevents redirect)
    clearCart();
    
    // Navigate to confirmation page
    router.push("/confirmation");
  };

  const total = getTotalPrice() * 1.1;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10" data-testid="checkout-title">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      data-testid="first-name-input"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1" data-testid="first-name-error">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      data-testid="last-name-input"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1" data-testid="last-name-error">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    data-testid="email-input"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1" data-testid="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    data-testid="phone-input"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1" data-testid="phone-error">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-5">
                <div>
                  <Label htmlFor="address">
                    Street Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    data-testid="address-input"
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1" data-testid="address-error">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      data-testid="city-input"
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1" data-testid="city-error">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      data-testid="state-input"
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive mt-1" data-testid="state-error">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="zipCode">
                      ZIP Code <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleChange("zipCode", e.target.value)}
                      data-testid="zip-input"
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-destructive mt-1" data-testid="zip-error">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-5">
                <div>
                  <Label htmlFor="cardNumber">
                    Card Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleChange("cardNumber", e.target.value)}
                    data-testid="card-number-input"
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive mt-1" data-testid="card-number-error">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cardName">
                    Cardholder Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value)}
                    data-testid="card-name-input"
                  />
                  {errors.cardName && (
                    <p className="text-sm text-destructive mt-1" data-testid="card-name-error">
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="expiryDate">
                      Expiry Date <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleChange("expiryDate", e.target.value)}
                      data-testid="expiry-input"
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive mt-1" data-testid="expiry-error">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cvv">
                      CVV <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleChange("cvv", e.target.value)}
                      data-testid="cvv-input"
                    />
                    {errors.cvv && (
                      <p className="text-sm text-destructive mt-1" data-testid="cvv-error">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-5">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="checkout-subtotal">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span data-testid="checkout-tax">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span data-testid="checkout-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                  data-testid="place-order-button"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
