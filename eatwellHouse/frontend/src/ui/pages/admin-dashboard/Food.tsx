import { useMutation, useQuery } from "@tanstack/react-query";
import { createFoodMutation, getCategoryOptions, uploadMediaMutation } from "../../../api/@tanstack/react-query.gen";
import { Button } from "../../shadcn/button";
import { Checkbox } from "../../shadcn/checkbox";
import { Input } from "../../shadcn/input";
import { Label } from "../../shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Food = () => {

  const {data:categoryList, isLoading, isError} = useQuery({
    ...getCategoryOptions()
  })
  const uploadMedia = useMutation({
  ...uploadMediaMutation(),
  onSuccess: (response) => {
    console.log("File uploaded successfully", response); // good!
    setValue("image", response.id); // ✅ only set the ID
  },
});

  const createFood = useMutation({
    ...createFoodMutation(),
    onSuccess: () => {
      toast("Food created successfully", {
        style: {
          background: "green",
          color: "white",
      }});
    },
    onError: (error) => {
    toast.error("Failed to create food. Check the inputs.");
    console.error("Create food error:", error);
  }
  })

  const { handleSubmit, register, setValue } = useForm(
    {
      defaultValues: {
        name: "",
        price: 0,
        quantity: 0,
        spicyness: false,
        image: "",
        category: "",
      },
    }
  );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Add New Food
      </h2>

      <form onSubmit={handleSubmit((data) => {
        const payload = {
          ...data,
          image: Number(data.image),
          category: Number(data.category),
        };

        console.log(payload); // Confirm correct types
        createFood.mutate({ body: payload });
      })} className="space-y-4">
        <div>
          <Label className="block mb-1">Name</Label>
          <Input
            type="text"
            {...register("name")}
            placeholder="Enter food name"
          />
        </div>

        <div>
          <Label className="block mb-1">Price</Label>
          <Input type="text" placeholder="Enter price" min={1} {...register("price", {
            valueAsNumber: true,
          })} />
        </div>

        <div>
          <Label className="block mb-1">Quantity</Label>
          <Input
            type="text"
            placeholder="Enter quantity"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox onCheckedChange={(value) => {console.log(value)
            setValue("spicyness", value as boolean)
          }} id="spicyness"/>
          <Label htmlFor="spicyness">Has Spicyness</Label>
        </div>

        <div>
        <Label className="block mb-1">Image</Label>
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              uploadMedia.mutate({
                body: {
                  file: file,
                  type: "FOOD_IMAGE",
                },
              });
            }
          }}
        />
      </div>

        {isLoading && <p>Loading categories...</p>}
        {categoryList && !isLoading && categoryList.length > 0 && !isError && (

        <div>
          <Label className="block mb-1">Category</Label>
          <Select {...register("category")} onValueChange={(value) => setValue("category", value)}>
            <SelectTrigger  className="w-full">
              <SelectValue  placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        )}

        <div className="pt-4 text-right">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Food
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Food;
