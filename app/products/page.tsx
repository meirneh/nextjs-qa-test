"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/data/products";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Search, Star } from "lucide-react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useCart();

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3" data-testid="page-title">
          Products
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse our collection of quality products
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="search-input"
          />
        </div>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          data-testid="category-filter"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          data-testid="sort-select"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating">Rating</option>
        </Select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 md:py-20" data-testid="no-products">
          <p className="text-muted-foreground text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="flex flex-col" data-testid={`product-card-${product.id}`}>
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    data-testid={`product-image-${product.id}`}
                  />
                  {!product.inStock && (
                    <Badge
                      variant="secondary"
                      className="absolute right-2 top-2"
                      data-testid={`out-of-stock-badge-${product.id}`}
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <CardTitle className="mb-2 text-lg" data-testid={`product-name-${product.id}`}>
                  {product.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium" data-testid={`product-rating-${product.id}`}>
                    {product.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <p className="text-2xl font-bold" data-testid={`product-price-${product.id}`}>
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid={`view-details-${product.id}`}
                  >
                    View Details
                  </Button>
                </Link>
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10 md:mt-12 text-center text-sm text-muted-foreground" data-testid="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}
