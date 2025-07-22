import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

const fetchProperty = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/property/${id}`);
  return data;
};

const updateProperty = async ({ id, updatedData }) => {
  await axios.put(`http://localhost:3000/myProperty/${id}`, updatedData);
};

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id),
  });

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    description: "",
  });

  // property আসলে formData তে সেট করো
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        location: property.location || "",
        minPrice: property.minPrice || "",
        maxPrice: property.maxPrice || "",
        description: property.description || "",
      });
    }
  }, [property]);

  const mutation = useMutation({
    mutationFn: (updatedData) => updateProperty({ id, updatedData }),
    onSuccess: () => {
      navigate("/my-properties");
    },
  });

  if (isLoading) return <div>Loading property...</div>;
  if (isError) return <div>Error loading property</div>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...property,
      ...formData,
    };

    mutation.mutate(updated);
  };
  console.log(formData);

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Update Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block font-medium">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block font-medium">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {mutation.isLoading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
