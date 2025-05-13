import { useRef, useState } from "react";
import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
import { Label } from "../../shadcn/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Category = () => {
  const {handleSubmit} = useForm();
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
      const categoryMutation = useMutation({
        mutationFn: async () => {
          const formData = new FormData();
          formData.append("name", categoryName);
          if (thumbnail) {
            formData.append("file", thumbnail as Blob);
          }
          
          const response = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
            method: "POST",
            body: formData,
          });
          if (!response.ok) throw new Error("Failed to create category");
          return response.json();
        },
        onSuccess: () => {
          toast("Category created successfully", {
            style: {
              background: "green", color: "white"}
          });
          setCategoryName("");
          setThumbnail(null);
          if (fileInputRef.current) {
          fileInputRef.current.value = "";
          }
        },
        onError: (error) => {
          console.error("Error:", error);
          toast("Error creating category", {
            style: {
              background: "red", color: "white"}
          });
        },
      })


  return (
    <form
      onSubmit={handleSubmit(() => {
        categoryMutation.mutate();
      })}
      className="space-y-2 shadow-md rounded-md p-5 bg-white"
    >
      <Label htmlFor="category">Category Name</Label>
      <Input
        id="category"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />

      <Label htmlFor="thumbnail">Thumbnail Image</Label>
      <Input
        type="file"
        id="thumbnail"
        ref={fileInputRef} // ✅ Attach the ref
        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
      />

      <Button className="cursor-pointer" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Category;
