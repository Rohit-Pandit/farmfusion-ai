const AnalyticsCards = ({ analytics }) => {
  const cards = [
    {
      title: "Total Orders",
      value: analytics.totalOrders,
      emoji: "📦",
    },

    {
      title: "Pending Orders",
      value: analytics.pendingOrders,
      emoji: "⏳",
    },

    {
      title: "Delivered Orders",
      value: analytics.deliveredOrders,
      emoji: "✅",
    },

    {
      title: "Revenue",
      value: `₹${analytics.totalRevenue}`,
      emoji: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{card.title}</p>

              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>

            <div className="text-5xl">{card.emoji}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
