/**
 * Footer component
 */
export default function Footer() {
    const d = new Date();
    const year = d.getFullYear();
  return (
    <footer className="w-full py-4 bg-gray-800 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">&copy; { year } My Application. All rights reserved.</p>
      </div>
    </footer>
  );
}