
import React from 'react';

const Admin: React.FC = () => {
  const stats = [
    { label: "Total Assessments", value: "1,284" },
    { label: "Active Institutions", value: "14" },
    { label: "Critical Pathogens Detected", value: "342" },
    { label: "System Uptime", value: "99.9%" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-serif text-primary mb-2">Administration Console</h1>
        <p className="text-mutedGray">Institutional system management and monitoring</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-8 rounded-subtle shadow-sm">
            <span className="text-xs font-bold uppercase text-mutedGray tracking-widest block mb-2">{stat.label}</span>
            <span className="text-3xl font-serif text-primary">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-gray-200 rounded-subtle p-8 shadow-sm">
            <h3 className="text-xl font-serif text-primary mb-6 border-b border-gray-100 pb-4">Recent System Activity</h3>
            <div className="space-y-4">
              {[
                "New user registered: Agricultural Officer (North Sector)",
                "System maintenance completed: Pattern analysis model updated",
                "Large scale report generated: Plot B-12 Analysis",
                "Database backup successful"
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-2 border-b border-gray-50 last:border-0">
                  <span className="text-charcoal">{log}</span>
                  <span className="text-xs text-mutedGray">2h ago</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white border border-gray-200 rounded-subtle p-8 shadow-sm">
            <h3 className="text-xl font-serif text-primary mb-6 border-b border-gray-100 pb-4">Platform Configuration</h3>
            <div className="space-y-4">
              <button className="w-full text-left p-3 text-sm bg-offWhite border border-gray-200 rounded-subtle font-medium hover:bg-gray-100">User Access Control</button>
              <button className="w-full text-left p-3 text-sm bg-offWhite border border-gray-200 rounded-subtle font-medium hover:bg-gray-100">Database Export (.sql)</button>
              <button className="w-full text-left p-3 text-sm bg-offWhite border border-gray-200 rounded-subtle font-medium hover:bg-gray-100">Model Sensitivity Parameters</button>
              <button className="w-full text-left p-3 text-sm bg-offWhite border border-gray-200 rounded-subtle font-medium hover:bg-gray-100">Institutional Branding Settings</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
