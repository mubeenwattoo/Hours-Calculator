export interface CalculatorInput {
  startTime: string;
  endTime: string;
  breakMinutes: number;
  overtimeThresholdHours: number;
  overtimeRate?: number;
}

export type CalculationMode = "single" | "range";

export interface DateCalculatorInput extends CalculatorInput {
  mode: CalculationMode;
  startDate: string;
  endDate: string;
  weekdaysOnly: boolean;
}

export interface CalculationResult {
  isValid: boolean;
  error?: string;
  totalMinutes: number;
  totalHours: number;
  hoursDisplay: string;
  overtimeMinutes: number;
  overtimeHours: number;
  regularMinutes: number;
  regularHours: number;
  overtimePay?: number;
  summary: string;
  mode: CalculationMode;
  dayCount: number;
  dailyMinutes: number;
  dailyHoursDisplay: string;
  dateLabel: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExampleRow {
  label: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  description?: string;
}

export interface RelatedTool {
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
