const DashboardCropCard = ({
  crop,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      
      <img
        src={
          crop.image ||
          "https://placehold.co/600x400?text=farmfusion"
        }
        alt={crop.title}
        className="w-full h-52 object-cover"
      />

      {/* Content */}
      <div className="p-4">

        <h2 className="text-2xl font-bold">
          {crop.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {crop.description}
        </p>

        <div className="mt-4 space-y-1">

          <p>
            <span className="font-semibold">
              Price:
            </span>{" "}
            ₹{crop.price}
          </p>

          <p>
            <span className="font-semibold">
              Quantity:
            </span>{" "}
            {crop.quantity} kg
          </p>
        </div>

       
        <div className="flex gap-3 mt-6">

          <button
            className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(crop._id)
            }
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCropCard;