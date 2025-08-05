export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">User Management</h2>
        <p>Approve or reject deliveryman applications.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Orders Overview</h2>
        <p>All orders across the platform will show here.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Analytics</h2>
        <p>Revenue, active users, and delivery stats will appear here.</p>
      </section>
    </div>
  );
}
