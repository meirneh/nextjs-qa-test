"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    // Generate order number once and store it in sessionStorage
    const storedOrderNumber = sessionStorage.getItem("orderNumber");
    
    if (storedOrderNumber) {
      setOrderNumber(storedOrderNumber);
    } else {
      // Generate a new order number: ORD-XXXXXX format
      const newOrderNumber = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      sessionStorage.setItem("orderNumber", newOrderNumber);
      setOrderNumber(newOrderNumber);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <CheckCircle
              className="mx-auto h-20 w-20 text-green-600 mb-6"
              data-testid="success-icon"
            />
            <h1 className="text-4xl font-bold mb-4" data-testid="confirmation-title">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your purchase
            </p>
            
            {orderNumber && (
              <div className="mb-8 p-6 bg-muted rounded-lg border-2 border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Your Order Number
                </p>
                <p className="text-3xl md:text-4xl font-bold font-mono text-primary" data-testid="order-number">
                  {orderNumber}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Please save this number for your records
                </p>
              </div>
            )}

            <div className="space-y-4 mb-8 text-left bg-muted p-6 rounded-lg">
              <h2 className="font-semibold text-lg">What's Next?</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ You will receive a confirmation email shortly</li>
                <li>✓ Your order will be processed within 24 hours</li>
                <li>✓ Estimated delivery: 3-5 business days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" data-testid="continue-shopping-button">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Go to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
