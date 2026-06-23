import type { ExampleRow, FAQItem, NavLink, RelatedTool } from "@/types";

export const SITE_NAME = "HourCalc";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://mubeenwattoo.github.io/Hours-Calculator";

export const NAV_LINKS: NavLink[] = [
  { label: "Calculator", href: "#calculator" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Examples", href: "#examples" },
  { label: "FAQ", href: "#faq" },
];

export const TRUST_INDICATORS = [
  "100% Free",
  "No Sign-Up Required",
  "Instant Results",
  "Privacy Friendly",
];

export const FEATURE_BADGES = [
  "Work Hours",
  "Overtime",
  "Break Time",
  "Payroll Ready",
];

export const BENEFITS = [
  {
    title: "Save Time",
    description:
      "Stop manually counting hours on paper or spreadsheets. Get accurate results in seconds.",
    icon: "Clock",
  },
  {
    title: "Accurate Calculations",
    description:
      "Precise minute-level math handles overnight shifts, breaks, and overtime automatically.",
    icon: "Target",
  },
  {
    title: "Payroll Assistance",
    description:
      "Export-ready totals help you prepare timesheets and verify paycheck accuracy.",
    icon: "Wallet",
  },
  {
    title: "Overtime Tracking",
    description:
      "Instantly see regular vs. overtime hours based on your standard workday threshold.",
    icon: "TrendingUp",
  },
  {
    title: "Freelancer Friendly",
    description:
      "Track billable hours across multiple clients with clear, professional summaries.",
    icon: "Briefcase",
  },
  {
    title: "Employee Friendly",
    description:
      "Verify your hours before submitting timesheets and catch discrepancies early.",
    icon: "Users",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Enter your start time",
    description:
      "Select the time you began work using the intuitive time picker. AM and PM shifts are both supported.",
    icon: "LogIn",
  },
  {
    step: 2,
    title: "Enter your end time and breaks",
    description:
      "Add your end time and any unpaid break minutes. Lunch breaks and rest periods are subtracted automatically.",
    icon: "Coffee",
  },
  {
    step: 3,
    title: "Get instant results",
    description:
      "View total hours, overtime, and a detailed summary instantly. Copy results with one click.",
    icon: "Sparkles",
  },
];

export const EXAMPLES: ExampleRow[] = [
  {
    label: "Standard 9-to-5",
    startTime: "09:00",
    endTime: "17:00",
    breakMinutes: 60,
    description: "Typical office day with 1-hour lunch break",
  },
  {
    label: "Extended Workday",
    startTime: "08:30",
    endTime: "18:00",
    breakMinutes: 30,
    description: "Long day with a short break",
  },
  {
    label: "Night Shift",
    startTime: "22:00",
    endTime: "06:00",
    breakMinutes: 30,
    description: "Overnight shift crossing midnight",
  },
];

export const FEATURES = [
  {
    title: "Instant Results",
    description: "Click Calculate for instant results — accurate totals in one step.",
    icon: "Zap",
  },
  {
    title: "Mobile Friendly",
    description: "Fully responsive design works perfectly on phones, tablets, and desktops.",
    icon: "Smartphone",
  },
  {
    title: "No Registration",
    description: "Start calculating immediately. No account, email, or personal data required.",
    icon: "Shield",
  },
  {
    title: "Free Forever",
    description: "Our hours calculator is completely free with no hidden fees or premium tiers.",
    icon: "Gift",
  },
  {
    title: "Accurate Time Tracking",
    description: "Minute-precise math handles edge cases like overnight shifts and long breaks.",
    icon: "CheckCircle",
  },
  {
    title: "Easy To Use",
    description: "Clean interface designed for everyone — from first-time users to payroll pros.",
    icon: "Heart",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I calculate work hours?",
    answer:
      "To calculate work hours, subtract your start time from your end time, then deduct any unpaid break time. For example, working from 9:00 AM to 5:00 PM with a 60-minute lunch break equals 7 hours. Our calculator handles this automatically — just enter your times and break duration.",
  },
  {
    question: "How do I subtract break time from my hours?",
    answer:
      "Enter your break duration in minutes in the Break Duration field. The calculator subtracts this from your total time span before calculating hours worked. Both paid and unpaid breaks can be entered — simply use the minutes that should not count toward worked hours.",
  },
  {
    question: "How do I calculate overtime hours?",
    answer:
      "Overtime is calculated as any hours worked beyond the standard threshold (default 8 hours per day). If you work 10 hours in a day, you'll see 8 regular hours and 2 overtime hours. You can optionally add an overtime rate to estimate overtime pay at 1.5× the hourly rate.",
  },
  {
    question: "Can I use this calculator for payroll?",
    answer:
      "Yes! Many employees and small business owners use our hours calculator to prepare timesheets and verify payroll accuracy. While this tool provides accurate time calculations, always confirm overtime rules and pay rates with your employer or local labor regulations.",
  },
  {
    question: "Is the hours calculator free to use?",
    answer:
      "Absolutely. HourCalc is 100% free with no registration, no downloads, and no hidden fees. Use it as often as you need for work hours, overtime, and time tracking.",
  },
  {
    question: "Does this calculator work for overnight shifts?",
    answer:
      "Yes. When your end time is earlier than your start time (e.g., 10:00 PM to 6:00 AM), the calculator automatically treats the end time as the next day, giving you accurate overnight shift calculations.",
  },
  {
    question: "What is the difference between regular and overtime hours?",
    answer:
      "Regular hours are the standard hours worked within your defined threshold (typically 8 hours per day). Overtime hours are any additional hours beyond that threshold. Labor laws vary by region, so check your local regulations for official overtime definitions.",
  },
  {
    question: "How accurate is this hours calculator?",
    answer:
      "Our calculator performs minute-level precision math. It correctly handles time spans crossing midnight, subtracts break periods, and calculates overtime based on your threshold. Results are displayed in both hours/minutes format and decimal hours for payroll systems.",
  },
  {
    question: "Can freelancers use this for billing clients?",
    answer:
      "Definitely. Freelancers and contractors use HourCalc to track billable hours, prepare invoices, and maintain accurate records. Copy your results with one click to paste into invoices, timesheets, or project management tools.",
  },
  {
    question: "Do you store my time entries?",
    answer:
      "No. All calculations happen locally in your browser. We don't store, transmit, or share your time entries or personal data. Your privacy is fully protected.",
  },
];

export const RELATED_TOOLS: RelatedTool[] = [
  {
    title: "Time Difference Calculator",
    description: "Calculate the exact time difference between any two points in time.",
    icon: "ArrowLeftRight",
    comingSoon: true,
  },
  {
    title: "Overtime Calculator",
    description: "Dedicated overtime pay calculator with custom rates and rules.",
    icon: "TrendingUp",
    comingSoon: true,
  },
  {
    title: "Payroll Calculator",
    description: "Estimate gross pay, deductions, and net pay from hours worked.",
    icon: "DollarSign",
    comingSoon: true,
  },
  {
    title: "Time Converter",
    description: "Convert between hours, minutes, seconds, and decimal time formats.",
    icon: "Repeat",
    comingSoon: true,
  },
  {
    title: "Work Hours Calculator",
    description: "Track weekly and monthly work hours with schedule templates.",
    icon: "Calendar",
    comingSoon: true,
  },
];
