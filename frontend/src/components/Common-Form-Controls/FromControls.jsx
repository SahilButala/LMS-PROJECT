import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "../ui/select";
import { Textarea } from "../ui/textarea";


const FromControls = ({ fromcontrols = [], formData, setFromData }) => {
  function renderComponentByType(getitem) {
    let element = null;
    const values = formData[getitem.name] ||  "";
    switch (getitem.componentType) {
      case "input":
        element = (
          <Input
            id={getitem.name}
            type={getitem.type}
            placeholder={getitem.placeholder}
            name={getitem.name}
            value={values}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getitem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFromData({
                ...formData,
                [getitem.name]: value,
              })
            }
            value={values}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getitem.label} />
            </SelectTrigger>
            <SelectContent>
              {getitem.options && getitem.options.length > 0
                ? getitem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : ''}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            type={getitem.type}
            placeholder={getitem.placeholder}
            name={getitem.name}
            value={values}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getitem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            id={getitem.name}
            type={getitem.type}
            placeholder={getitem.placeholder}
            name={getitem.name}
            value={values}
            onChange={(e) =>
              setFromData({
                ...formData,
                [getitem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }
  return (
    <div>
      {fromcontrols.map((item) => (
        <div key={item.name} className="flex flex-col gap-4">
          <Label className="mt-2 capitalize" htmlFor={item.id}>
            {item.label}
          </Label>
          {renderComponentByType(item)}
        </div>
      ))}
    </div>
  );
};

export default FromControls;
