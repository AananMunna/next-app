export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">My Orders</h2>
        <p>List of recent orders will go here.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Apply to Be Deliveryman</h2>
        <form className="flex flex-col gap-3 max-w-md">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="p-2 border rounded"
          />
          <button className="bg-blue-600 text-white py-2 rounded">
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}
