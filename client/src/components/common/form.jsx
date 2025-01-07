import { useId } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled = false
}) => {
  const renderInputsByComponentType = ({
    name,
    placeholder,
    componentType,
    type,
    options,
  }) => {
    let element = null;
    let value = formData[name] || "";
    switch (componentType) {
      case "input":
        element = (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(val) => {
              setFormData({ ...formData, [name]: val });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options && options.length > 0
                ? options.map((option) => (
                    <SelectItem key={useId()} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
      default:
        element = (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
        );
        break;
    }

    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={useId()} className="grid w-full gap-1.5">
            <Label>{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
        <Button type="submit" className="mt-2 w-full" disabled={isBtnDisabled}>
          {buttonText || "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;
