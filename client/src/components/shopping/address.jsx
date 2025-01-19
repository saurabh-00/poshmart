import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import AddressCard from "./address-card";
import {
  addAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "@/store/shop/address-slice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const handleAddressFormSubmit = (e) => {
    e.preventDefault();

    if (addresses.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add maximum 3 addresses",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId === null) {
      dispatch(addAddress(formData))
        .then((data) => {
          if (data?.payload?.success) {
            setFormData(initialAddressFormData);
            toast({
              title: data?.payload?.message,
            });
          } else {
            throw new Error("Failed to add address");
          }
        })
        .catch((e) => {
          toast({
            title: e?.response?.data?.message || "Failed to add address",
            variant: "destructive",
          });
        });
    } else {
      dispatch(
        updateAddress({
          addressId: currentEditedId,
          formData,
        })
      )
        .then((data) => {
          if (data?.payload?.success) {
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: data?.payload?.message,
            });
          } else {
            throw new Error("Failed to update address");
          }
        })
        .catch((e) => {
          toast({
            title: e?.response?.data?.message || "Failed to update address",
            variant: "destructive",
          });
        });
    }
  };

  const handleEditAddress = (addressInfo) => {
    setCurrentEditedId(addressInfo?._id);
    setFormData({
      ...formData,
      address: addressInfo?.address,
      city: addressInfo?.city,
      phone: addressInfo?.phone,
      pincode: addressInfo?.pincode,
      notes: addressInfo?.notes,
    });
  };

  const handleDeleteAddress = (addressInfo) => {
    dispatch(deleteAddress(addressInfo?._id))
      .then((data) => {
        if (data?.payload?.success) {
          if (currentEditedId === addressInfo?._id) {
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
          }
          toast({
            title: data?.payload?.message,
          });
        } else {
          throw new Error("Failed to delete address");
        }
      })
      .catch((e) => {
        toast({
          title: e?.response?.data?.message || "Failed to delete address",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  const isFormValid = () => {
    return Object.keys(formData)
      .filter((keyItem) => keyItem !== "notes")
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-2">
        {!!addresses.length &&
          addresses.map((address) => (
            <AddressCard
              key={address?._id}
              addressInfo={address}
              handleEditAddress={handleEditAddress}
              handleDeleteAddress={handleDeleteAddress}
            />
          ))}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddressFormSubmit}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
