import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <UserButton afterSignOutUrl="/" />
          </div>
          {/* Navigation Links */}
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">Overview</a>
            <a href="/dashboard/bookings" className="block p-2 hover:bg-gray-100 rounded">Bookings</a>
            <a href="/dashboard/services" className="block p-2 hover:bg-gray-100 rounded">Services</a>
            <a href="/dashboard/settings" className="block p-2 hover:bg-gray-100 rounded">Settings</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}