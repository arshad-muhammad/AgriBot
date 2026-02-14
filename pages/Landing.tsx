
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-warmSand">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl font-serif text-primary leading-tight mb-8">
            Crop Disease Identification & Report System
          </h1>
          <p className="text-xl text-mutedGray leading-relaxed mb-10 max-w-lg">
            A structured image-based crop condition assessment platform designed for farmers and agricultural experts.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-block bg-primary text-white px-10 py-4 font-medium rounded-subtle hover:bg-opacity-90 transition-all border border-primary"
          >
            Start Analysis
          </Link>
        </div>
        <div className="relative">
          <img 
            src="https://picsum.photos/seed/agriculture/800/600" 
            alt="Agricultural research" 
            className="w-full h-[500px] object-cover rounded-subtle shadow-lg"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-offWhite py-24 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-center mb-16">Methodological Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Upload Crop Image", desc: "Submit high-resolution captures of the affected plant specimens for analysis." },
              { step: "02", title: "Automated Condition Assessment", desc: "Our pattern analysis models identify pathological indicators and nutritional deficiencies." },
              { step: "03", title: "Download Detailed Report", desc: "Receive an institutional-grade assessment report with recommended interventions." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-100 rounded-subtle shadow-sm">
                <span className="text-secondary font-serif text-4xl block mb-6">{item.step}</span>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-mutedGray text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-primary mb-8">Core Assessment Features</h2>
            <ul className="space-y-6">
              {[
                "Structured Crop Analysis",
                "Treatment Recommendation",
                "Preventive Advisory",
                "Downloadable PDF Reports",
                "Historical Record Tracking"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-4 text-charcoal">
                  <div className="w-2 h-2 bg-secondary" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/wheat/400/300" className="rounded-subtle object-cover w-full h-48" />
            <img src="https://picsum.photos/seed/leaves/400/300" className="rounded-subtle object-cover w-full h-48 mt-8" />
            <img src="https://picsum.photos/seed/soil/400/300" className="rounded-subtle object-cover w-full h-48 -mt-8" />
            <img src="https://picsum.photos/seed/expert/400/300" className="rounded-subtle object-cover w-full h-48" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
