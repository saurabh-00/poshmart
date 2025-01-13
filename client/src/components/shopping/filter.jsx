import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-secondary rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyOption) => (
          <div key={`${keyOption}_filter`}>
            <h3 className="text-base font-semibold capitalize">{keyOption}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyOption].map((option) => (
                <Label
                  key={`${keyOption}_filter_${option.id}`}
                  className="flex font-normal items-center gap-2"
                >
                  <Checkbox
                    checked={
                      filters &&
                      filters.hasOwnProperty(keyOption) &&
                      filters[keyOption].includes(option.id)
                    }
                    onCheckedChange={() => handleFilters(keyOption, option.id)}
                  />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
