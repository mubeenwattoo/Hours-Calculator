import type {
  CalculatorInput,
  CalculationResult,
  DateCalculatorInput,
} from "@/types";

function parseTimeToMinutes(time: string): number | null {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function getTodayDateString(): string {
  return formatDateToInput(new Date());
}

export function formatDateToInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateDisplay(dateStr: string): string {
  const date = parseLocalDate(dateStr);
  if (!date) return dateStr;
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function countDaysInRange(
  startDate: string,
  endDate: string,
  weekdaysOnly: boolean,
): number | null {
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);
  if (!start || !end) return null;
  if (end < start) return null;

  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    const dayOfWeek = current.getDay();
    if (!weekdaysOnly || (dayOfWeek !== 0 && dayOfWeek !== 6)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

function formatDecimalHours(totalMinutes: number): string {
  return (totalMinutes / 60).toFixed(2);
}

function buildDailySummary(
  totalMinutes: number,
  regularMinutes: number,
  overtimeMinutes: number,
  breakMinutes: number,
  overtimePay?: number,
): string {
  const parts: string[] = [
    `You worked ${formatDuration(totalMinutes)} (${formatDecimalHours(totalMinutes)} hours) per day`,
  ];

  if (breakMinutes > 0) {
    parts.push(
      `after subtracting ${breakMinutes} minute${breakMinutes !== 1 ? "s" : ""} of breaks`,
    );
  }

  if (overtimeMinutes > 0) {
    parts.push(
      `including ${formatDuration(overtimeMinutes)} of overtime and ${formatDuration(regularMinutes)} of regular time`,
    );
  }

  if (overtimePay !== undefined && overtimePay > 0) {
    parts.push(`estimated daily overtime pay: $${overtimePay.toFixed(2)}`);
  }

  return parts.join(", ") + ".";
}

function buildDateLabel(
  mode: DateCalculatorInput["mode"],
  startDate: string,
  endDate: string,
  dayCount: number,
  weekdaysOnly: boolean,
): string {
  if (mode === "single") {
    return formatDateDisplay(startDate);
  }
  if (startDate === endDate) {
    return formatDateDisplay(startDate);
  }
  const dayType = weekdaysOnly ? "weekday" : "calendar";
  return `${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)} (${dayCount} ${dayType} day${dayCount !== 1 ? "s" : ""})`;
}

export function calculateHours(input: CalculatorInput): CalculationResult {
  const empty: CalculationResult = {
    isValid: false,
    totalMinutes: 0,
    totalHours: 0,
    hoursDisplay: "0h",
    overtimeMinutes: 0,
    overtimeHours: 0,
    regularMinutes: 0,
    regularHours: 0,
    summary: "",
    mode: "single",
    dayCount: 1,
    dailyMinutes: 0,
    dailyHoursDisplay: "0h",
    dateLabel: "",
  };

  if (!input.startTime || !input.endTime) {
    return { ...empty, error: "Please enter both start and end times." };
  }

  const startMinutes = parseTimeToMinutes(input.startTime);
  const endMinutes = parseTimeToMinutes(input.endTime);

  if (startMinutes === null || endMinutes === null) {
    return { ...empty, error: "Invalid time format. Use HH:MM." };
  }

  if (input.breakMinutes < 0) {
    return { ...empty, error: "Break duration cannot be negative." };
  }

  if (input.breakMinutes > 480) {
    return {
      ...empty,
      error: "Break duration seems too long. Please check your entry.",
    };
  }

  let endAdjusted = endMinutes;
  if (endAdjusted <= startMinutes) {
    endAdjusted += 24 * 60;
  }

  const grossMinutes = endAdjusted - startMinutes;

  if (input.breakMinutes >= grossMinutes) {
    return {
      ...empty,
      error: "Break duration cannot be equal to or longer than your work period.",
    };
  }

  const totalMinutes = grossMinutes - input.breakMinutes;
  const thresholdMinutes = input.overtimeThresholdHours * 60;
  const overtimeMinutes = Math.max(0, totalMinutes - thresholdMinutes);
  const regularMinutes = totalMinutes - overtimeMinutes;

  const overtimePay =
    input.overtimeRate && input.overtimeRate > 0
      ? (overtimeMinutes / 60) * input.overtimeRate * 1.5
      : undefined;

  const hoursDisplay = formatDuration(totalMinutes);
  const summary = buildDailySummary(
    totalMinutes,
    regularMinutes,
    overtimeMinutes,
    input.breakMinutes,
    overtimePay,
  );

  return {
    isValid: true,
    totalMinutes,
    totalHours: totalMinutes / 60,
    hoursDisplay,
    overtimeMinutes,
    overtimeHours: overtimeMinutes / 60,
    regularMinutes,
    regularHours: regularMinutes / 60,
    overtimePay,
    summary,
    mode: "single",
    dayCount: 1,
    dailyMinutes: totalMinutes,
    dailyHoursDisplay: hoursDisplay,
    dateLabel: "",
  };
}

export function calculateHoursWithDates(
  input: DateCalculatorInput,
): CalculationResult {
  const empty: CalculationResult = {
    isValid: false,
    totalMinutes: 0,
    totalHours: 0,
    hoursDisplay: "0h",
    overtimeMinutes: 0,
    overtimeHours: 0,
    regularMinutes: 0,
    regularHours: 0,
    summary: "",
    mode: input.mode,
    dayCount: 0,
    dailyMinutes: 0,
    dailyHoursDisplay: "0h",
    dateLabel: "",
  };

  if (!input.startDate) {
    return { ...empty, error: "Please select a date." };
  }

  if (input.mode === "range" && !input.endDate) {
    return { ...empty, error: "Please select an end date." };
  }

  const endDate = input.mode === "single" ? input.startDate : input.endDate;

  if (!parseLocalDate(input.startDate) || !parseLocalDate(endDate)) {
    return { ...empty, error: "Invalid date. Please use the date picker." };
  }

  const dayCount = countDaysInRange(
    input.startDate,
    endDate,
    input.weekdaysOnly,
  );

  if (dayCount === null) {
    return { ...empty, error: "End date must be on or after the start date." };
  }

  if (dayCount === 0) {
    return {
      ...empty,
      error: input.weekdaysOnly
        ? "No weekdays fall within the selected date range."
        : "No days in the selected date range.",
    };
  }

  const daily = calculateHours(input);
  if (!daily.isValid) {
    return { ...daily, mode: input.mode, dayCount, dateLabel: "" };
  }

  const totalMinutes = daily.totalMinutes * dayCount;
  const totalOvertimeMinutes = daily.overtimeMinutes * dayCount;
  const totalRegularMinutes = daily.regularMinutes * dayCount;
  const totalOvertimePay =
    daily.overtimePay !== undefined
      ? daily.overtimePay * dayCount
      : undefined;

  const dateLabel = buildDateLabel(
    input.mode,
    input.startDate,
    endDate,
    dayCount,
    input.weekdaysOnly,
  );

  let summary = daily.summary;
  if (dayCount > 1) {
    summary = `${dateLabel}: ${formatDuration(totalMinutes)} (${formatDecimalHours(totalMinutes)} hours) total across ${dayCount} days at ${daily.hoursDisplay} per day.`;
    if (totalOvertimeMinutes > 0) {
      summary += ` Total overtime: ${formatDuration(totalOvertimeMinutes)}.`;
    }
    if (totalOvertimePay !== undefined && totalOvertimePay > 0) {
      summary += ` Estimated total overtime pay: $${totalOvertimePay.toFixed(2)}.`;
    }
  } else {
    summary = `${dateLabel}: ${daily.summary.replace(" per day", "")}`;
  }

  return {
    isValid: true,
    totalMinutes,
    totalHours: totalMinutes / 60,
    hoursDisplay: formatDuration(totalMinutes),
    overtimeMinutes: totalOvertimeMinutes,
    overtimeHours: totalOvertimeMinutes / 60,
    regularMinutes: totalRegularMinutes,
    regularHours: totalRegularMinutes / 60,
    overtimePay: totalOvertimePay,
    summary,
    mode: input.mode,
    dayCount,
    dailyMinutes: daily.totalMinutes,
    dailyHoursDisplay: daily.hoursDisplay,
    dateLabel,
  };
}

export function formatTime12h(time24: string): string {
  const parsed = parseTimeToMinutes(time24);
  if (parsed === null) return time24;
  const hours = Math.floor(parsed / 60);
  const minutes = parsed % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatResultForCopy(result: CalculationResult): string {
  if (!result.isValid) return "";
  const lines = [
    "Hours Calculator Results",
    "────────────────────────",
  ];

  if (result.dateLabel) {
    lines.push(`Period: ${result.dateLabel}`);
  }

  if (result.dayCount > 1) {
    lines.push(`Days: ${result.dayCount}`);
    lines.push(`Hours Per Day: ${result.dailyHoursDisplay}`);
  }

  lines.push(
    `Total Hours Worked: ${result.hoursDisplay} (${formatDecimalHours(result.totalMinutes)} hrs)`,
    `Total Minutes: ${result.totalMinutes}`,
    `Regular Hours: ${formatDuration(result.regularMinutes)}`,
    `Overtime Hours: ${formatDuration(result.overtimeMinutes)}`,
  );

  if (result.overtimePay !== undefined && result.overtimePay > 0) {
    lines.push(`Estimated Overtime Pay: $${result.overtimePay.toFixed(2)}`);
  }

  lines.push("", result.summary);
  return lines.join("\n");
}
