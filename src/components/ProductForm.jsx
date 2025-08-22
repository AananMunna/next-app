"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Upload, Save, X } from "lucide-react";

export default function ProductForm({ initialData = null, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  const defaultValues = initialData || {
    title: "",
    brand: "",
    model: "",
    releaseDate: "",
    sku: "",
    price: 0,
    discountPrice: 0,
    currency: "USD",
    category: "Smartphones",
    overview: "",
    technicalSpecs: {
      processor: "",
      ram: "",
      storage: [""],
      battery: "",
      display: {
        size: "",
        type: "",
        resolution: "",
        protection: "",
        peakBrightness: ""
      },
      rearCameras: [{ type: "", mp: 0, features: [""], opticalZoom: "" }],
      frontCamera: { mp: 0, features: [""] },
      video: { rear: "", front: "" },
      connectivity: {
        "5G": false,
        bluetooth: "",
        wifi: [""],
        nfc: false,
        gps: [""],
        usb: "",
        uwb: false,
        audioJack: false
      },
      sensors: [""],
      os: "",
      dimensions: { height: "", width: "", depth: "" },
      weight: "",
      colorOptions: [""],
      ipRating: ""
    },
    images: [""],
    descriptionSections: {
      design: "",
      cameraPerformance: "",
      batteryLife: "",
      gaming: "",
      audio: ""
    },
    rating: 0,
    reviews: [],
    stock: 0,
    warranty: "",
    features: [""],
    availableAt: [""]
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  const { fields: storageFields, append: appendStorage, remove: removeStorage } = useFieldArray({
    control,
    name: "technicalSpecs.storage"
  });

  const { fields: cameraFields, append: appendCamera, remove: removeCamera } = useFieldArray({
    control,
    name: "technicalSpecs.rearCameras"
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "features"
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });

  const { fields: availableAtFields, append: appendAvailableAt, remove: removeAvailableAt } = useFieldArray({
    control,
    name: "availableAt"
  });

  const { fields: sensorFields, append: appendSensor, remove: removeSensor } = useFieldArray({
    control,
    name: "technicalSpecs.sensors"
  });

  const { fields: wifiFields, append: appendWifi, remove: removeWifi } = useFieldArray({
    control,
    name: "technicalSpecs.connectivity.wifi"
  });

  const { fields: gpsFields, append: appendGps, remove: removeGps } = useFieldArray({
    control,
    name: "technicalSpecs.connectivity.gps"
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: "technicalSpecs.colorOptions"
  });

  const { fields: frontCameraFeatureFields, append: appendFrontCameraFeature, remove: removeFrontCameraFeature } = useFieldArray({
    control,
    name: "technicalSpecs.frontCamera.features"
  });

  const submitForm = async (data) => {
    setIsLoading(true);
    try {
      // Convert string numbers to actual numbers
      const processedData = {
        ...data,
        price: Number(data.price),
        discountPrice: Number(data.discountPrice),
        stock: Number(data.stock),
        rating: Number(data.rating),
        technicalSpecs: {
          ...data.technicalSpecs,
          rearCameras: data.technicalSpecs.rearCameras.map(cam => ({
            ...cam,
            mp: Number(cam.mp)
          })),
          frontCamera: {
            ...data.technicalSpecs.frontCamera,
            mp: Number(data.technicalSpecs.frontCamera.mp)
          }
        }
      };
      
      await onSubmit(processedData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {initialData ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit(submitForm)}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="descriptions">Descriptions</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic product details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      {...register("title", { required: "Product title is required" })}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      {...register("brand", { required: "Brand is required" })}
                    />
                    {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      {...register("model", { required: "Model is required" })}
                    />
                    {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="releaseDate">Release Date</Label>
                    <Input
                      id="releaseDate"
                      type="date"
                      {...register("releaseDate")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      {...register("sku")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select {...register("category")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Smartphones">Smartphones</SelectItem>
                        <SelectItem value="Tablets">Tablets</SelectItem>
                        <SelectItem value="Laptops">Laptops</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price", { 
                        required: "Price is required",
                        min: { value: 0, message: "Price must be positive" }
                      })}
                    />
                    {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">Discount Price ($)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      step="0.01"
                      {...register("discountPrice", { 
                        min: { value: 0, message: "Discount price must be positive" }
                      })}
                    />
                    {errors.discountPrice && <p className="text-sm text-destructive">{errors.discountPrice.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select {...register("currency")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="BDT">BDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock", { 
                        required: "Stock quantity is required",
                        min: { value: 0, message: "Stock cannot be negative" }
                      })}
                    />
                    {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overview">Product Overview</Label>
                  <Textarea
                    id="overview"
                    rows={3}
                    {...register("overview")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warranty">Warranty Information</Label>
                  <Input
                    id="warranty"
                    {...register("warranty")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Enter the product technical specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processor">Processor</Label>
                    <Input
                      id="processor"
                      {...register("technicalSpecs.processor")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM</Label>
                    <Input
                      id="ram"
                      {...register("technicalSpecs.ram")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="battery">Battery</Label>
                    <Input
                      id="battery"
                      {...register("technicalSpecs.battery")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="os">Operating System</Label>
                    <Input
                      id="os"
                      {...register("technicalSpecs.os")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      {...register("technicalSpecs.weight")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ipRating">IP Rating</Label>
                    <Input
                      id="ipRating"
                      {...register("technicalSpecs.ipRating")}
                    />
                  </div>
                </div>

                {/* Storage Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Storage Options</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendStorage("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Storage
                    </Button>
                  </div>
                  {storageFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`technicalSpecs.storage.${index}`)}
                        placeholder="Storage option (e.g., 256 GB)"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeStorage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Display Specifications */}
                <div className="space-y-4 border p-4 rounded-lg">
                  <h3 className="font-medium">Display Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displaySize">Display Size</Label>
                      <Input
                        id="displaySize"
                        {...register("technicalSpecs.display.size")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayType">Display Type</Label>
                      <Input
                        id="displayType"
                        {...register("technicalSpecs.display.type")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resolution">Resolution</Label>
                      <Input
                        id="resolution"
                        {...register("technicalSpecs.display.resolution")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="protection">Protection</Label>
                      <Input
                        id="protection"
                        {...register("technicalSpecs.display.protection")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="peakBrightness">Peak Brightness</Label>
                      <Input
                        id="peakBrightness"
                        {...register("technicalSpecs.display.peakBrightness")}
                      />
                    </div>
                  </div>
                </div>

                {/* Rear Cameras */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Rear Cameras</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendCamera({ type: "", mp: 0, features: [""] })}>
                      <Plus className="h-4 w-4 mr-1" /> Add Camera
                    </Button>
                  </div>
                  {cameraFields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Camera {index + 1}</h4>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeCamera(index)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`cameraType-${index}`}>Camera Type</Label>
                          <Input
                            id={`cameraType-${index}`}
                            {...register(`technicalSpecs.rearCameras.${index}.type`)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`cameraMp-${index}`}>Megapixels</Label>
                          <Input
                            id={`cameraMp-${index}`}
                            type="number"
                            {...register(`technicalSpecs.rearCameras.${index}.mp`)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`opticalZoom-${index}`}>Optical Zoom</Label>
                          <Input
                            id={`opticalZoom-${index}`}
                            {...register(`technicalSpecs.rearCameras.${index}.opticalZoom`)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Front Camera */}
                <div className="space-y-4 border p-4 rounded-lg">
                  <h3 className="font-medium">Front Camera</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frontCameraMp">Front Camera Megapixels</Label>
                      <Input
                        id="frontCameraMp"
                        type="number"
                        {...register("technicalSpecs.frontCamera.mp")}
                      />
                    </div>
                  </div>
                </div>

                {/* Connectivity */}
                <div className="space-y-4 border p-4 rounded-lg">
                  <h3 className="font-medium">Connectivity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="technicalSpecs.connectivity.5G"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="5g">5G Support</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        name="technicalSpecs.connectivity.nfc"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="nfc">NFC</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        name="technicalSpecs.connectivity.uwb"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="uwb">UWB</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Controller
                        name="technicalSpecs.connectivity.audioJack"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="audioJack">Audio Jack</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bluetooth">Bluetooth</Label>
                      <Input
                        id="bluetooth"
                        {...register("technicalSpecs.connectivity.bluetooth")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usb">USB</Label>
                      <Input
                        id="usb"
                        {...register("technicalSpecs.connectivity.usb")}
                      />
                    </div>
                  </div>

                  {/* WiFi Standards */}
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <Label>WiFi Standards</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => appendWifi("")}>
                        <Plus className="h-4 w-4 mr-1" /> Add WiFi Standard
                      </Button>
                    </div>
                    {wifiFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <Input
                          {...register(`technicalSpecs.connectivity.wifi.${index}`)}
                          placeholder="WiFi standard (e.g., Wi-Fi 6)"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeWifi(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* GPS Standards */}
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <Label>GPS Standards</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => appendGps("")}>
                        <Plus className="h-4 w-4 mr-1" /> Add GPS Standard
                      </Button>
                    </div>
                    {gpsFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <Input
                          {...register(`technicalSpecs.connectivity.gps.${index}`)}
                          placeholder="GPS standard (e.g., A-GPS)"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeGps(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sensors */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Sensors</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendSensor("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Sensor
                    </Button>
                  </div>
                  {sensorFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`technicalSpecs.sensors.${index}`)}
                        placeholder="Sensor name"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSensor(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Color Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Color Options</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendColor("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Color
                    </Button>
                  </div>
                  {colorFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`technicalSpecs.colorOptions.${index}`)}
                        placeholder="Color name"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeColor(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Add product images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Product Images (URLs)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendImage("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Image
                    </Button>
                  </div>
                  {imageFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`images.${index}`)}
                        placeholder="Image URL"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Descriptions Tab */}
          <TabsContent value="descriptions">
            <Card>
              <CardHeader>
                <CardTitle>Description Sections</CardTitle>
                <CardDescription>Add detailed product descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="design">Design</Label>
                  <Textarea
                    id="design"
                    rows={3}
                    {...register("descriptionSections.design")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cameraPerformance">Camera Performance</Label>
                  <Textarea
                    id="cameraPerformance"
                    rows={3}
                    {...register("descriptionSections.cameraPerformance")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batteryLife">Battery Life</Label>
                  <Textarea
                    id="batteryLife"
                    rows={3}
                    {...register("descriptionSections.batteryLife")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gaming">Gaming</Label>
                  <Textarea
                    id="gaming"
                    rows={3}
                    {...register("descriptionSections.gaming")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audio">Audio</Label>
                  <Textarea
                    id="audio"
                    rows={3}
                    {...register("descriptionSections.audio")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional Tab */}
          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Add features and availability information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Features</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendFeature("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Feature
                    </Button>
                  </div>
                  {featureFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`features.${index}`)}
                        placeholder="Feature description"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Available At</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendAvailableAt("")}>
                      <Plus className="h-4 w-4 mr-1" /> Add Retailer
                    </Button>
                  </div>
                  {availableAtFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start">
                      <Input
                        {...register(`availableAt.${index}`)}
                        placeholder="Retailer name"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeAvailableAt(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    {...register("rating")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline">
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" /> {isLoading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}