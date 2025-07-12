import { useContext } from "react";
// import { useAuth } from "../hooks/useAuth"; // তুমি যেখান থেকে ইউজার তথ্য আনো
// import { useForm } from "react-hook-form";
// import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { imageUpload } from "../../api/utils";

const AddProperty = () => {
  const { user } = useContext(AuthContext); // ধরে নিই এখানে থেকে logged in user পাবো
  // const { register, handleSubmit, reset } = useForm();
  // const [imagePreview, setImagePreview] = useState(null);

  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", data.title);
  //     formData.append("location", data.location);
  //     formData.append("priceRange", data.priceRange);
  //     formData.append("agentName", user.displayName);
  //     formData.append("agentEmail", user.email);
  //     formData.append("image", data.image[0]);
  //     console.log(formData);
  //     console.log("hello world");

  //     await axios.post("/properties", formData);
  //     alert("Property added successfully!");
  //     reset();
  //     setImagePreview(null);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to add property.");
  //   }
  // };

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImagePreview(URL.createObjectURL(e.target.files[0]));
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const form = e.target;
    const title = form.propertyTitle.value;
    const location = form.location.value;
    const price = form.price.value;
    const image = form.image?.files[0];

    const imageUrl = await imageUpload(image);
    const landData = { title, location, price, image: imageUrl };
    console.log(landData);
    const data = await axios.post(
      "http://localhost:3000/add-property",
      landData
    );
    console.log(data);
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
            // {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter property title"
            name="propertyTitle"
          />
        </div>

        {/* Property Location */}
        <div>
          <label className="block mb-1 font-medium">Property Location</label>
          <input
            type="text"
            // {...register("location", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter property location"
            name="location"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Property Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            // {...register("image", { required: true })}
            // onChange={handleImageChange}
            className=" text-sm cursor-pointer  w-full"
          />
          {/* {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-40 h-28 object-cover rounded"
            />
          )} */}
        </div>

        {/* Agent Name */}
        <div>
          <label className="block mb-1 font-medium">Agent Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="block mb-1 font-medium">Agent Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block mb-1 font-medium">Price Range</label>
          <input
            type="text"
            // {...register("priceRange", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. $100,000 - $150,000"
            name="price"
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
