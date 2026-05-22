const CropCard = ({ crop }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">

      <img
        src={crop.image || "https://placehold.co/600x400?text=FarmFusion"}
        alt={crop.title}
        className="w-full h-52 object-cover"
      />

      
      <div className="p-4">

        <h2 className="text-2xl font-bold mb-2">
          {crop.title}
        </h2>

        <p className="text-gray-600 mb-3">
          {crop.description}
        </p>

        <div className="space-y-1 text-gray-700">

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

          <p>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {crop.category}
          </p>

          <p>
            <span className="font-semibold">
              Location:
            </span>{" "}
            {crop.location}
          </p>
        </div>

        
        <div className="mt-4 text-sm text-gray-500">
          Farmer: {crop.farmer?.name}
        </div>
      </div>
    </div>
  );
};

export default CropCard;