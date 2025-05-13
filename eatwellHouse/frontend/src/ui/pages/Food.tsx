import { Button } from "../shadcn/button";
import { Checkbox } from "../shadcn/checkbox";
import { Input } from "../shadcn/input";
import { Label } from "../shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

const Food = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Food</h2>

      <form className="space-y-4">
        <div>
          <Label className="block mb-1">Name</Label>
          <Input type="text" name="name" placeholder="Enter food name" />
        </div>

        <div>
          <Label className="block mb-1">Price</Label>
          <Input type="text" name="price" placeholder="Enter price" />
        </div>

        <div>
          <Label className="block mb-1">Quantity</Label>
          <Input type="text" name="quantity" placeholder="Enter quantity" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="spicyness" name="spicyness" />
          <Label htmlFor="spicyness">Has Spicyness</Label>
        </div>

        <div>
          <Label className="block mb-1">Image</Label>
          <Input type="file" name="thumbnail" />
        </div>

        <div>
          <Label className="block mb-1">Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 text-right">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Add Food
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Food;
