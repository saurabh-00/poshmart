import ProductImageUpload from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeatures);
  const { toast } = useToast();

  const handleUploadFeatureImage = () => {
    if (!uploadedImageUrl) {
      toast({
        title: "Upload an image first",
      });
      return;
    }
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          <Fragment>
            <h1 className="text-2xl font-semibold mt-4">Feature Images</h1>
            {featureImageList.map((featureImgItem) => (
              <div key={featureImgItem?._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))}
          </Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
