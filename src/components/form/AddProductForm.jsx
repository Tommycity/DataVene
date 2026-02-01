import { useState } from "react";
import AddInputField from "./AddInputField";
import AppSubmitButton from "./AppSubmitButton";

const AddProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productType: "Standard",
    productName: "",
    productCode: "",
    barcodeSymbology: "Code 128",
    brand: "",
    category: "",
    productUnit: "",
    saleUnit: "",
    purchaseUnit: "",
    productCost: "",
    profitMargin: "",
    productPrice: "",
    wholesalePrice: "",
    dailySaleObjective: "",
    alertQuantity: "",
    productTax: "none",
    taxMethod: "exclusive",
    warrantyPeriod: "",
    warrantyUnit: "months",
    guaranteePeriod: "",
    guaranteeUnit: "months",
    featured: false,
    embeddedBarcode: false,
    initialStock: false,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 rounded-lg"
    >
      <p className="text-gray-500 mb-3">
        The field labels marked with * are required input fields.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {/* Product Type */}
        <div>
          <label className="text-gray-600 text-sm">Product Type *</label>
          <select
            value={formData.productType}
            onChange={(e) => handleChange("productType", e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="Standard">Standard</option>
            <option value="Standard">Combo</option>
            <option value="Digital">Digital</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="text-gray-600 text-sm">Product Name *</label>
          <AddInputField
            name="productName"
            value={formData.productName}
            onChange={(e) => handleChange("productName", e.target.value)}
          />
        </div>

        {/* Product Code */}
        <div>
          <label className="text-gray-600 text-sm">Product Code *</label>
          <AddInputField
            name="productCode"
            value={formData.productCode}
            onChange={(e) => handleChange("productCode", e.target.value)}
          />
        </div>

        {/* Barcode Symbology */}
        <div>
          <label className="text-gray-600 text-sm">Barcode Symbology *</label>
          <select
            value={formData.barcodeSymbology}
            onChange={(e) => handleChange("barcodeSymbology", e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="Code 128">Code 128</option>
            <option value="Code 128">Code 39</option>
            <option value="UPC-A">UPC A</option>
            <option value="UPC-E">UPC E</option>
            <option value="EAN-8">EAN-13</option>
            <option value="EAN-13">EAN-13</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-gray-600 text-sm">Brand</label>
          <AddInputField
            name="brand"
            value={formData.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-600 text-sm">Category *</label>
          <AddInputField
            name="category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
        </div>

        {/* Product Unit */}
        <div>
          <label className="text-gray-600 text-sm">Product Unit *</label>
          <AddInputField
            name="productUnit"
            value={formData.productUnit}
            onChange={(e) => handleChange("productUnit", e.target.value)}
          />
        </div>

        {/* Sale Unit */}
        <div>
          <label className="text-gray-600 text-sm">Sale Unit</label>
          <AddInputField
            name="saleUnit"
            value={formData.saleUnit}
            onChange={(e) => handleChange("saleUnit", e.target.value)}
          />
        </div>

        {/* Purchase Unit */}
        <div>
          <label className="text-gray-600 text-sm">Purchase Unit</label>
          <AddInputField
            name="purchaseUnit"
            value={formData.purchaseUnit}
            onChange={(e) => handleChange("purchaseUnit", e.target.value)}
          />
        </div>

        {/* Product Cost */}
        <div>
          <label className="text-gray-600 text-sm">Product Cost *</label>
          <AddInputField
            name="productCost"
            type="number"
            value={formData.productCost}
            onChange={(e) => handleChange("productCost", e.target.value)}
          />
        </div>

        {/* Profit Margin */}
        <div>
          <label className="text-gray-600 text-sm">Profit Margin (%)</label>
          <AddInputField
            name="profitMargin"
            type="number"
            value={formData.profitMargin}
            onChange={(e) => handleChange("profitMargin", e.target.value)}
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="text-gray-600 text-sm">Product Price *</label>
          <AddInputField
            name="productPrice"
            type="number"
            value={formData.productPrice}
            onChange={(e) => handleChange("productPrice", e.target.value)}
          />
        </div>

        {/* Wholesale Price */}
        <div>
          <label className="text-gray-600 text-sm">Wholesale Price *</label>
          <AddInputField
            name="wholesalePrice"
            type="number"
            value={formData.wholesalePrice}
            onChange={(e) => handleChange("wholesalePrice", e.target.value)}
          />
        </div>

        {/* Daily Sale Objective */}
        <div>
          <label className="text-gray-600 text-sm">Daily Sale Objective</label>
          <AddInputField
            name="dailySaleObjective"
            type="number"
            value={formData.dailySaleObjective}
            onChange={(e) => handleChange("dailySaleObjective", e.target.value)}
          />
        </div>

        {/* Alert Quantity */}
        <div>
          <label className="text-gray-600 text-sm">Alert Quantity</label>
          <AddInputField
            name="alertQuantity"
            type="number"
            value={formData.alertQuantity}
            onChange={(e) => handleChange("alertQuantity", e.target.value)}
          />
        </div>

        {/* Product Tax */}
        <div>
          <label className="text-gray-600 text-sm">Product Tax</label>
          <AddInputField
            name="productTax"
            options={[
              { label: "No Tax", value: "none" },
              { label: "5%", value: "5" },
              { label: "10%", value: "10" },
            ]}
            value={formData.productTax}
            onChange={(e) => handleChange("productTax", e.target.value)}
          />
        </div>

        {/* Tax Method */}
        <div>
          <label className="text-gray-600 text-sm">Tax Method</label>
          <AddInputField
            name="taxMethod"
            options={[
              { label: "Exclusive", value: "exclusive" },
              { label: "Inclusive", value: "inclusive" },
            ]}
            value={formData.taxMethod}
            onChange={(e) => handleChange("taxMethod", e.target.value)}
          />
        </div>

        {/* Warranty */}
        <div className="flex gap-2">
          <div>
            <label className="text-gray-600 text-sm">Warranty</label>
            <AddInputField
              name="warrantyPeriod"
              type="number"
              placeholder="eg: 1"
              value={formData.warrantyPeriod}
              onChange={(e) => handleChange("warrantyPeriod", e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">&nbsp;</label>
            <AddInputField
              name="warrantyUnit"
              options={[
                { label: "Months", value: "months" },
                { label: "Years", value: "years" },
              ]}
              value={formData.warrantyUnit}
              onChange={(e) => handleChange("warrantyUnit", e.target.value)}
            />
          </div>
        </div>

        {/* Guarantee */}
        <div className="flex gap-2">
          <div>
            <label className="text-gray-600 text-sm">Guarantee</label>
            <AddInputField
              name="guaranteePeriod"
              type="number"
              placeholder="eg: 1"
              value={formData.guaranteePeriod}
              onChange={(e) => handleChange("guaranteePeriod", e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm">&nbsp;</label>
            <AddInputField
              name="guaranteeUnit"
              options={[
                { label: "Months", value: "months" },
                { label: "Years", value: "years" },
              ]}
              value={formData.guaranteeUnit}
              onChange={(e) => handleChange("guaranteeUnit", e.target.value)}
            />
          </div>
        </div>

        {/* Checkboxes */}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.embeddedBarcode}
            onChange={(e) => handleChange("embeddedBarcode", e.target.checked)}
          />
          Embedded Barcode
        </label>

        <div>
          <label className="flex items-center gap-2">
            <AddInputField name="initialStock" type="checkbox" />
            {/* <input
              type="checkbox"
              checked={formData.initialStock}
              onChange={(e) => handleChange("initialStock", e.target.checked)}
            /> */}
            Initial Stock
          </label>
          <p className="text-gray-500 text-sm italic mt-1">
            This feature will not work for product with variants and batches
          </p>
        </div>
      </div>

      {/* Product Image Upload */}
      <div className="col-span-3">
        <label className="text-gray-600 text-sm">Product Image</label>
        <label
          htmlFor="productImage"
          className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-purple-500 transition"
        >
          <span className="text-gray-400">
            Drop files here or click to upload
          </span>
          <input
            id="productImage"
            name="productImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleChange("productImage", e.target.files[0])}
          />
        </label>
      </div>

      <div className="mt-6">
        <AppSubmitButton title="Add Product" className="bg-purple-500" />
      </div>
    </form>
  );
};

export default AddProductForm;
