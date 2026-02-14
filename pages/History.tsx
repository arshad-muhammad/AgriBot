
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AssessmentReport, Severity } from '../types';

const History: React.FC = () => {
  const [history, setHistory] = useState<AssessmentReport[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('agridiagnost_history');
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const severityColor = {
    [Severity.LOW]: 'text-secondary',
    [Severity.MODERATE]: 'text-moderate',
    [Severity.SEVERE]: 'text-severe'
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-primary mb-2">Report History</h1>
          <p className="text-mutedGray">Consolidated database of agricultural condition assessments</p>
        </div>
        <Link 
          to="/dashboard" 
          className="bg-primary text-white px-6 py-3 font-bold rounded-subtle text-sm"
        >
          New Assessment
        </Link>
      </header>

      {history.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-subtle p-24 text-center">
          <p className="text-mutedGray italic">No historical records found in the system.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-subtle overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-offWhite border-b border-gray-200">
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest">ID</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest">Crop</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest">Diagnosis</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest">Severity</th>
                <th className="px-8 py-5 text-xs font-bold uppercase text-mutedGray tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                  <td className="px-8 py-6 font-mono text-xs font-bold text-primary">{item.id}</td>
                  <td className="px-8 py-6 text-sm text-charcoal">{item.date}</td>
                  <td className="px-8 py-6 text-sm font-semibold">{item.cropType}</td>
                  <td className="px-8 py-6 text-sm">{item.diagnosis.diseaseName}</td>
                  <td className="px-8 py-6">
                    <span className={`text-xs font-bold uppercase ${severityColor[item.diagnosis.severity as Severity || Severity.LOW]}`}>
                      {item.diagnosis.severity}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      to={`/report/${item.id}`} 
                      className="text-secondary font-bold text-sm hover:underline"
                    >
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
