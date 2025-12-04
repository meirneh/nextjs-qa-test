import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Shield, Truck, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-gradient-to-b from-background to-muted py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6" data-testid="hero-title">
              Welcome to ShopHub
            </h1>
            <p className="text-xl text-muted-foreground mb-8" data-testid="hero-description">
              Your one-stop destination for electronics, furniture, and sports equipment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" data-testid="shop-now-button">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Free Shipping</CardTitle>
                <CardDescription>
                  Free delivery on all orders with fast and reliable shipping
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Your payment information is encrypted and secure
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-10 w-10 mb-4 text-primary" />
                <CardTitle>Easy Returns</CardTitle>
                <CardDescription>
                  30-day return policy for your peace of mind
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-muted-foreground mb-8">
              Explore our wide range of products and find exactly what you need
            </p>
            <Link href="/products">
              <Button size="lg" variant="outline">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
