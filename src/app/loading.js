export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-blue-600 font-semibold text-lg">Loading...</span>
    </div>
  );
}
