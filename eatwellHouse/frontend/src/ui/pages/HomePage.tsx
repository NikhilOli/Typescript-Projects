import { useQuery } from "@tanstack/react-query"
import LandingPageLayout from "../layouts/LandingPageLayout"

const HomePage = () => {

  const {isLoading, isError, data} = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/category`)
      if (!response.ok) throw new Error("Failed to fetch home data")
      return response.json()
    },
  })

  return (
    <LandingPageLayout>
        <div>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching data</p>}
          {data && (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Category Page</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((category: any) => (
        <div key={category.id} className="p-2 border rounded shadow">
          <div className="card w-full shadow-sm">
            <figure>
              <img
                src={category.thumbnail.name}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{category.name}</h2>
              <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
    </LandingPageLayout>
  )
}

export default HomePage