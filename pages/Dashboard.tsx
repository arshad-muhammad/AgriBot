
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeCropImage } from '../services/geminiService';
import { AssessmentReport, Severity } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cropType: 'Wheat',
    location: '',
    soilType: 'Loamy',
    symptoms: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload a crop image for assessment.");
      return;
    }

    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const result = await analyzeCropImage(
        base64Data, 
        formData.cropType, 
        formData.soilType, 
        formData.symptoms
      );

      const reportId = `AD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const report: AssessmentReport = {
        id: reportId,
        date: new Date().toLocaleDateString('en-GB'),
        cropType: formData.cropType,
        location: formData.location || "Unspecified",
        soilType: formData.soilType,
        observedSymptoms: formData.symptoms,
        imageUrl: image,
        ...result
      };

      // Save to local storage for persistence
      const historyRaw = localStorage.getItem('agridiagnost_history');
      const history = historyRaw ? JSON.parse(historyRaw) : [];
      history.unshift(report);
      localStorage.setItem('agridiagnost_history', JSON.stringify(history));

      navigate(`/report/${reportId}`, { state: { report } });
    } catch (error) {
      console.error(error);
      alert("An error occurred during Pattern Analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-serif text-primary mb-2">New Crop Assessment</h1>
        <p className="text-mutedGray italic">Automated Condition Detection for Agriculture Professionals</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-subtle p-10 shadow-sm">
        <form onSubmit={handleGenerateReport} className="space-y-8">
          {/* Image Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed border-gray-200 bg-offWhite p-12 text-center cursor-pointer rounded-subtle hover:border-secondary transition-all ${image ? 'p-4' : ''}`}
          >
            {image ? (
              <div className="relative group">
                <img src={image} className="max-h-64 mx-auto rounded-subtle shadow-md" alt="Preview" />
                <div className="mt-4 text-xs text-mutedGray">Click to change specimen image</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-secondary text-lg font-medium">Click or Drag Specimen Image Here</div>
                <div className="text-mutedGray text-sm">Supported formats: JPEG, PNG (Max 5MB)</div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal block">Crop Type</label>
              <select 
                className="w-full border border-gray-300 px-4 py-3 rounded-subtle focus:ring-1 focus:ring-primary focus:border-primary"
                value={formData.cropType}
                onChange={(e) => setFormData({...formData, cropType: e.target.value})}
              >
                <option>Wheat</option>
                <option>Rice</option>
                <option>Tomato</option>
                <option>Potato</option>
                <option>Cotton</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal block">Field Location</label>
              <input 
                type="text" 
                placeholder="e.g. Northern Sector, Plot B-12"
                className="w-full border border-gray-300 px-4 py-3 rounded-subtle focus:ring-1 focus:ring-primary focus:border-primary"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-charcoal block">Soil Type</label>
              <select 
                className="w-full border border-gray-300 px-4 py-3 rounded-subtle focus:ring-1 focus:ring-primary focus:border-primary"
                value={formData.soilType}
                onChange={(e) => setFormData({...formData, soilType: e.target.value})}
              >
                <option>Sandy</option>
                <option>Clay</option>
                <option>Loamy</option>
                <option>Mixed</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-charcoal block">Observed Symptoms</label>
            <textarea 
              rows={4}
              placeholder="Describe discoloration, wilting, insect presence, etc."
              className="w-full border border-gray-300 px-4 py-3 rounded-subtle focus:ring-1 focus:ring-primary focus:border-primary"
              value={formData.symptoms}
              onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-5 bg-primary text-white font-bold rounded-subtle tracking-wide uppercase text-sm border border-primary transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-95'}`}
          >
            {loading ? "Performing Automated Assessment..." : "Generate Analysis Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
