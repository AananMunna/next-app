export default function SellerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Manage Products</h2>
        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Add New Product
        </button>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
        <p>Revenue, orders, and best sellers will appear here.</p>
      </section>
    </div>
  );
}
