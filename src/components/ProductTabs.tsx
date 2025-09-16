
"use client";

import { useState, useEffect } from "react";
import { type Product } from "@/lib/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, Filter, Image as ImageIcon, Plus, Trash2, Upload, X } from "lucide-react";

export default function ProductsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    brandId: "",
    flavor: "",
    mrp: "",
    description: "",
    category: "",
    size: "",
    type: "",
    fragranceNotes: {
      topNotes: "",
      middleNotes: "",
      baseNotes: "",
    },
    images: [] as File[],
  });
  const [existingImages, setExistingImages] = useState<{ id: string; url: string; altText?: string }[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);


  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      const category = categoryFilter === "all" ? "" : categoryFilter;
      if (category) params.append("category", category);
      const type = typeFilter === "all" ? "" : typeFilter;
      if (type) params.append("type", type);
      const queryString = params.toString() ? `?${params.toString()}` : "";

      const response = await fetch(`/api/products${queryString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/brands");
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        toast.error("Failed to load brands");
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, categoryFilter, typeFilter]);

  const handleEdit = (product: Product) => {
    setForm({
      brandId: product.brandId,
      flavor: product.flavor,
      mrp: product.mrp,
      description: product.description,
      category: product.category,
      size: product.size,
      type: product.type,
      fragranceNotes: {
        topNotes: product.fragrance.topNotes,
        middleNotes: product.fragrance.middleNotes,
        baseNotes: product.fragrance.baseNotes,
      },
      images: [], // old field (not used now)
    });
    setExistingImages(product.images);  // <-- store old images separately
    setNewImages([]);                   // reset new uploads
    setEditingProduct(product);
    setOpen(true);
  };


  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFragranceChange = (field: keyof typeof form.fragranceNotes, value: string) => {
    setForm((prev) => ({
      ...prev,
      fragranceNotes: { ...prev.fragranceNotes, [field]: value },
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 5 - (existingImages.length + newImages.length));
      setNewImages((prev) => [...prev, ...newFiles]);
    }
  };


  // Delete existing image (DB one)
  const handleRemoveExistingImage = (id: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Delete new upload
  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };


  useEffect(() => {
    const previews = form.images.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev.filter((_, i) => i >= (editingProduct?.images.length || 0)), ...previews]);
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [form.images]);


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.brandId) newErrors.brandId = "Brand is required.";
    if (!form.flavor.trim()) newErrors.flavor = "Flavor Profile is required.";
    if (!form.mrp || isNaN(Number(form.mrp)) || Number(form.mrp) <= 0)
      newErrors.mrp = "MRP must be a valid positive number.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.size.trim()) newErrors.size = "Size is required.";
    if (!form.type) newErrors.type = "Type is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";

    // Image check only for new product creation
    if (!editingProduct && newImages.length === 0 && existingImages.length === 0) {
      newErrors.images = "At least one product image is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSave = async () => {
  if (!validateForm()) return; 
  try {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...form,
        images: undefined,
        fragranceNotes: form.fragranceNotes,
        existingImages: existingImages.map((img) => img.id),
      })
    );

    newImages.forEach((file, i) => formData.append(`image${i}`, file));

    const url = editingProduct
      ? `/api/products/${editingProduct.id}`
      : "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    const response = await fetch(url, { method, body: formData });
    if (!response.ok) throw new Error("Failed to save product");

    toast.success("Product saved successfully");

    // reset
    setOpen(false);
    setEditingProduct(undefined);
    setForm({
      brandId: "",
      flavor: "",
      mrp: "",
      description: "",
      category: "",
      size: "",
      type: "",
      fragranceNotes: { topNotes: "", middleNotes: "", baseNotes: "" },
      images: [],
    });
    setExistingImages([]);
    setNewImages([]);
    setImagePreviews([]);
    setErrors({});

    fetchProducts();
  } catch (error) {
    toast.error("Failed to save product");
      }
};


  const formatPrice = (price: string) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const getCategoryLabel = (type: string) => {
    const labels: Record<string, string> = {
      eau_de_parfum: "Eau de Parfum",
      eau_de_toilette: "Eau de Toilette",
      cologne: "Cologne",
      perfume_oil: "Perfume Oil",
      body_spray: "Body Spray",
    };
    return labels[type] || type;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      men: "Men's",
      women: "Women's",
      unisex: "Unisex",
    };
    return labels[type] || type;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">Manage your fragrance inventory</p>
        </div>
        <Button
          onClick={() => {
            setEditingProduct(undefined);
            setForm({
              brandId: "",
              flavor: "",
              mrp: "",
              description: "",
              category: "",
              size: "",
              type: "",
              fragranceNotes: {
                topNotes: "",
                middleNotes: "",
                baseNotes: "",
              },
              images: [],
            });
            setImagePreviews([]);
            setOpen(true);
          }}
          className="flex items-center space-x-2 rounded"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-4 p-2 rounded">
        <CardContent className="p-2">
          <div className="flex flex-col lg:flex-row gap-2 items-center">
            <div className="flex-1 w-full lg:w-auto">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="eau_de_parfum">Eau de Parfum</SelectItem>
                  <SelectItem value="eau_de_toilette">Eau de Toilette</SelectItem>
                  <SelectItem value="cologne">Cologne</SelectItem>
                  <SelectItem value="perfume_oil">Perfume Oil</SelectItem>
                  <SelectItem value="body_spray">Body Spray</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="men">Men's</SelectItem>
                  <SelectItem value="women">Women's</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="secondary" className="rounded">
                <Filter className="h-4 w-4 mr-2 rounded-none" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="text-muted-foreground">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-4">
                {searchQuery || categoryFilter !== "all" || typeFilter !== "all"
                  ? "No products found matching your criteria"
                  : "No products available"}
              </div>
              <Button
                className="rounded"
                onClick={() => {
                  setEditingProduct(undefined);
                  setForm({
                    brandId: "",
                    flavor: "",
                    mrp: "",
                    description: "",
                    category: "",
                    size: "",
                    type: "",
                    fragranceNotes: {
                      topNotes: "",
                      middleNotes: "",
                      baseNotes: "",
                    },
                    images: [],
                  });
                  setImagePreviews([]);
                  setOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>MRP</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {product.images.length > 0 ? (
                              <img
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.flavor}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.brand.name}</p>
                            <p className="text-sm text-muted-foreground">{product.flavor}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryLabel(product.category)}</TableCell>
                      <TableCell>{formatPrice(product.mrp)}</TableCell>
                      <TableCell>{product.size}</TableCell>
                      <TableCell>{getTypeLabel(product.type)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Form Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          {/* Form Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {/* Row 1 */}
            <div>
              <label className="text-sm font-medium block mb-1">Brand *</label>
              <Select
                value={form.brandId}
                onValueChange={(v) => handleChange("brandId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium">Flavor Profile</label>
              <input
                type="text"
                value={form.flavor}
                onChange={(e) => setForm({ ...form, flavor: e.target.value })}
                className="w-full rounded-lg border p-2"
              />
              {errors.flavor && <p className="text-sm text-red-500">{errors.flavor}</p>}
            </div>
            {/* Row 2 */}
            <div>
              <label className="block text-sm font-medium">MRP</label>
              <input
                type="number"
                value={form.mrp}
                onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                className="w-full rounded-lg border p-2"
              />
              {errors.mrp && <p className="text-sm text-red-500">{errors.mrp}</p>}
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Category *</label>
              <Select value={form.category} onValueChange={(v) => handleChange("category", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 3 */}
            <div>
              <label className="text-sm font-medium block mb-1">Size *</label>
              <Input
                value={form.size}
                onChange={(e) => handleChange("size", e.target.value)}
                placeholder="e.g., 50ml, 100ml"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Type *</label>
              <Select value={form.type} onValueChange={(v) => handleChange("type", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eau_de_parfum">Eau de Parfum</SelectItem>
                  <SelectItem value="eau_de_toilette">Eau de Toilette</SelectItem>
                  <SelectItem value="cologne">Cologne</SelectItem>
                  <SelectItem value="perfume_oil">Perfume Oil</SelectItem>
                  <SelectItem value="body_spray">Body Spray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Row 4 */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Description *</label>
              <Textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter product description"
                className="min-h-[120px]"
              />
            </div>

            {/* Fragrance Notes Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Fragrance Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium block mb-1">Top Notes</label>
                  <Input
                    value={form.fragranceNotes.topNotes}
                    onChange={(e) => handleFragranceChange("topNotes", e.target.value)}
                    placeholder="e.g., Bergamot, Lemon"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Middle Notes</label>
                  <Input
                    value={form.fragranceNotes.middleNotes}
                    onChange={(e) => handleFragranceChange("middleNotes", e.target.value)}
                    placeholder="e.g., Rose, Jasmine"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium block mb-1">Base Notes</label>
                  <Input
                    value={form.fragranceNotes.baseNotes}
                    onChange={(e) => handleFragranceChange("baseNotes", e.target.value)}
                    placeholder="e.g., Sandalwood, Vanilla"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-1">Product Images</label>
              <label
                htmlFor="image-upload"
                className="mt-2 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-accent transition-colors duration-200"
              >
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop images here, or{" "}
                  <span className="font-medium text-primary">browse files</span>
                </p>
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-muted-foreground mt-2">
                Supports JPG, PNG up to 5MB each (max 5 files)
              </p>

              {/* Existing DB Images */}
              {existingImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {existingImages.map((img) => (
                    <div key={img.id} className="relative">
                      <img src={img.url} alt={img.altText || "Product Image"} className="w-full h-32 object-cover rounded-lg border" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => handleRemoveExistingImage(img.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Uploads */}
              {newImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {newImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-32 object-cover rounded-lg border" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => handleRemoveNewImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}