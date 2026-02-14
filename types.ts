
export enum Severity {
  LOW = 'Low',
  MODERATE = 'Moderate',
  SEVERE = 'Severe'
}

export interface AssessmentReport {
  id: string;
  date: string;
  cropType: string;
  location: string;
  soilType: string;
  observedSymptoms: string;
  imageUrl?: string;
  diagnosis: {
    diseaseName: string;
    confidence: number;
    description: string;
    severity: Severity;
  };
  symptoms: string[];
  causes: string[];
  treatment: {
    chemical: string;
    organic: string;
    dosage: string;
    frequency: string;
  };
  preventiveMeasures: string[];
}

export interface HistoryItem {
  id: string;
  date: string;
  cropType: string;
  location: string;
  severity: Severity;
}
