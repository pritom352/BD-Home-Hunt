import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { imageUpload } from "../../api/utils";

const AddProperty = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.propertyTitle.value;
    const location = form.location.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const description = form.description.value;

    const files = form.images.files;

    const imageUrls = [];
    for (let file of files) {
      const url = await imageUpload(file);
      imageUrls.push(url);
    }

    const landData = {
      title,
      location,
      description,
      priceRange: `$${minPrice} - $${maxPrice}`,
      images: imageUrls,
      agentName: user?.displayName,
      agentEmail: user?.email,
      agentImage: user?.photoURL,
    };

    console.log(landData);

    const data = await axios.post(
      "http://localhost:3000/add-property",
      landData
    );

    console.log(data);
    alert("✅ Property Added!");
    form.reset();
  };

  return (
    <section className="max-w-3xl mx-auto mt-10 bg-white shadow p-8 rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Title */}
        <div>
          <label className="block mb-1 font-medium">Property Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter property title"
            name="propertyTitle"
            required
          />
        </div>

        {/* Property Location */}
        <div>
          <label className="block mb-1 font-medium">Property Location</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter property location"
            name="location"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Property Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full border px-3 py-2 rounded"
            placeholder="Write property description..."
            required
          />
        </div>

        {/* Price Range */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Minimum Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 100000"
              name="minPrice"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">Maximum Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 150000"
              name="maxPrice"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Property Images</label>
          <input
            type="file"
            accept="image/*"
            name="images"
            multiple
            className="text-sm cursor-pointer w-full"
            required
          />
        </div>

        {/* Agent Info */}
        <div>
          <label className="block mb-1 font-medium">Agent Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Agent Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Property
        </button>
      </form>
    </section>
  );
};

export default AddProperty;
