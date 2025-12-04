"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Star, Minus, Plus } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center max-w-md mx-auto" data-testid="product-not-found">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Product Not Found</h1>
          <Link href="/products">
            <Button size="lg">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link href="/products">
        <Button variant="ghost" className="mb-8" data-testid="back-button">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid gap-8 md:gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
        <div className="relative aspect-square overflow-hidden rounded-xl border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            data-testid="product-detail-image"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <Badge className="mb-3" data-testid="product-category">
              {product.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="product-detail-name">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium" data-testid="product-detail-rating">
                  {product.rating}
                </span>
              </div>
              <span className="text-muted-foreground" data-testid="product-detail-reviews">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-8 text-lg leading-relaxed" data-testid="product-detail-description">
            {product.description}
          </p>

          <div className="mb-8">
            <p className="text-4xl md:text-5xl font-bold" data-testid="product-detail-price">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mb-8">
            {product.inStock ? (
              <Badge variant="secondary" data-testid="in-stock-badge">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" data-testid="out-of-stock-badge">
                Out of Stock
              </Badge>
            )}
          </div>

          {product.inStock && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity" className="mb-2 block">
                  Quantity
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    data-testid="decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    data-testid="quantity-input"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    data-testid="increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                data-testid="add-to-cart-detail"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          )}

          <div className="mt-8 space-y-4 border-t pt-6">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product ID</span>
                <span data-testid="product-id">{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability</span>
                <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
