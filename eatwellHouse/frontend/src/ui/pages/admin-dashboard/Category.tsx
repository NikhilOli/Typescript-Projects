import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
import { Label } from "../../shadcn/label";
// import { useForm } from "react-hook-form";

const Category = () => {
  // const {handleSumbit} = useForm();
  return (
    <form onSubmit={() => {
       
    }} className="space-y-2 shadow-md rounded-md p-5 bg-white">
      <Label htmlFor="category">Category Name</Label>
      <Input id="category" placeholder="Category Name" />
      <Label htmlFor="thumbnail">Thumbnail Image</Label>
      <Input type="file" id="thumbnail" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Category;
