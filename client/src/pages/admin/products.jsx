import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/store/admin/products-slice";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {
  const [openProductForm, setOpenProductForm] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const { products, isLoading } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentProductId !== null) {
      dispatch(updateProduct({ id: currentProductId, formData })).then(
        (data) => {
          if (data.payload.success) {
            setCurrentProductId(null);
            setFormData(initialFormData);
            setOpenProductForm(false);
          }
        }
      );
    } else {
      dispatch(addProduct({ ...formData, image: uploadedImageUrl })).then(
        (data) => {
          if (data.payload.success) {
            toast({
              title: data.payload.message,
            });
            setImageFile(null);
            setUploadedImageUrl(null);
            setFormData(initialFormData);
            setOpenProductForm(false);
          }
        }
      );
    }
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductForm(true)}>
          <Plus />
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {!!products.length &&
          products.map((product) => (
            <AdminProductTile
              product={product}
              setOpenProductForm={setOpenProductForm}
              setFormData={setFormData}
              setCurrentProductId={setCurrentProductId}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      <Sheet
        open={openProductForm}
        onOpenChange={() => {
          setOpenProductForm(false);
          setCurrentProductId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentProductId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isEditMode={currentProductId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={currentProductId !== null ? "Edit" : "Add"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
