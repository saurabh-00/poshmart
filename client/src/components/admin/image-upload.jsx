import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CloudUpload, FileImage, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { apiUrl } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);
  const { toast } = useToast();

  const uploadImageToCloudinary = async () => {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("image", imageFile);
      const response = await axios.post(
        `${apiUrl}/admin/products/upload`,
        data,
        { withCredentials: true }
      );
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.url);
        setImageLoadingState(false);
        toast({
          title: response?.data?.message || "Image uploaded successfully",
        });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (e) {
      setImageLoadingState(false);
      handleRemoveImage();
      toast({
        title: e?.response?.data?.message || "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  const handleDrageOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setImageFile(null);
  };

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-sm font-medium mb-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDrageOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer h-32"
          >
            <CloudUpload className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop OR Click To Upload Image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <FileImage className="w-8 h-8 text-primary mr-2" />
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
