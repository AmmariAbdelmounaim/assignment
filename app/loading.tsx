export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></span>
      <span className="text-lg text-gray-700">Loading...</span>
    </div>
  );
}
