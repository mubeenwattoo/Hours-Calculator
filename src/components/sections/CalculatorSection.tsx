"use client";

import {
  AlertCircle,
  Calendar,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  RotateCcw,
  Timer,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  calculateHoursWithDates,
  formatResultForCopy,
  formatTime12h,
  getTodayDateString,
} from "@/lib/calculator";
import { cn } from "@/lib/utils";
import type { CalculationMode, CalculationResult } from "@/types";

const DEFAULT_START = "09:00";
const DEFAULT_END = "17:00";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-all duration-200 ease-out focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 hover:border-primary/40";

const labelClass = "mb-1 block text-xs font-medium text-foreground";

export function CalculatorSection() {
  const [mode, setMode] = useState<CalculationMode>("single");
  const [startDate, setStartDate] = useState(getTodayDateString);
  const [endDate, setEndDate] = useState(getTodayDateString);
  const [weekdaysOnly, setWeekdaysOnly] = useState(true);
  const [startTime, setStartTime] = useState(DEFAULT_START);
  const [endTime, setEndTime] = useState(DEFAULT_END);
  const [breakMinutes, setBreakMinutes] = useState("60");
  const [overtimeRate, setOvertimeRate] = useState("");
  const [overtimeThreshold, setOvertimeThreshold] = useState("8");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");

  const breakNum = parseInt(breakMinutes, 10) || 0;
  const thresholdNum = parseFloat(overtimeThreshold) || 8;
  const rateNum = overtimeRate ? parseFloat(overtimeRate) : undefined;

  const result: CalculationResult = useMemo(
    () =>
      calculateHoursWithDates({
        mode,
        startDate,
        endDate: mode === "range" ? endDate : startDate,
        weekdaysOnly,
        startTime,
        endTime,
        breakMinutes: breakNum,
        overtimeThresholdHours: thresholdNum,
        overtimeRate: rateNum,
      }),
    [
      mode,
      startDate,
      endDate,
      weekdaysOnly,
      startTime,
      endTime,
      breakNum,
      thresholdNum,
      rateNum,
    ],
  );

  const handleReset = () => {
    const today = getTodayDateString();
    setMode("single");
    setStartDate(today);
    setEndDate(today);
    setWeekdaysOnly(true);
    setStartTime(DEFAULT_START);
    setEndTime(DEFAULT_END);
    setBreakMinutes("60");
    setOvertimeRate("");
    setOvertimeThreshold("8");
    setCopyStatus("idle");
  };

  const handleCopy = async () => {
    if (!result.isValid) return;
    try {
      await navigator.clipboard.writeText(formatResultForCopy(result));
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const breakError =
    breakMinutes !== "" && (isNaN(breakNum) || breakNum < 0)
      ? "Enter a valid break duration."
      : null;

  const rateError =
    overtimeRate !== "" && (isNaN(rateNum!) || rateNum! < 0)
      ? "Enter a valid hourly rate."
      : null;

  const showResults =
    result.isValid && !breakError && !rateError && startDate !== "";
  const showEmpty = !startTime || !endTime || !startDate;

  return (
    <section
      id="calculator"
      className="scroll-mt-16 bg-secondary/30 py-10 sm:py-12 lg:py-14"
      aria-labelledby="calculator-heading"
    >
      <SiteContainer>
        <SectionHeading
          label="Calculator"
          title="Hours Calculator"
          subtitle="Pick dates, enter shift times, and get instant totals."
          className="mb-5 sm:mb-6"
        />

        <div className="grid gap-4 lg:grid-cols-2 lg:items-stretch">
          <Card className="!p-4 sm:!p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                Time Entry
              </h3>
              <ModeToggle mode={mode} onChange={setMode} />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {mode === "single" ? (
                <FieldWrap className="col-span-2 lg:col-span-3">
                  <label htmlFor="work-date" className={labelClass}>
                    Work Date
                  </label>
                  <input
                    type="date"
                    id="work-date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setEndDate(e.target.value);
                    }}
                    suppressHydrationWarning
                    className={inputClass}
                  />
                </FieldWrap>
              ) : (
                <>
                  <FieldWrap>
                    <label htmlFor="start-date" className={labelClass}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      suppressHydrationWarning
                      className={inputClass}
                    />
                  </FieldWrap>
                  <FieldWrap>
                    <label htmlFor="end-date" className={labelClass}>
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      suppressHydrationWarning
                      className={inputClass}
                    />
                  </FieldWrap>
                  <label className="col-span-2 flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 lg:col-span-1">
                    <input
                      type="checkbox"
                      checked={weekdaysOnly}
                      onChange={(e) => setWeekdaysOnly(e.target.checked)}
                      suppressHydrationWarning
                      className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-foreground">Weekdays only</span>
                  </label>
                </>
              )}

              <FieldWrap>
                <label htmlFor="start-time" className={labelClass}>
                  Start Time
                </label>
                <input
                  type="time"
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  suppressHydrationWarning
                  className={inputClass}
                />
              </FieldWrap>
              <FieldWrap>
                <label htmlFor="end-time" className={labelClass}>
                  End Time
                </label>
                <input
                  type="time"
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  suppressHydrationWarning
                  className={inputClass}
                />
              </FieldWrap>
              <FieldWrap>
                <label htmlFor="break-duration" className={labelClass}>
                  Break (min)
                </label>
                <input
                  type="number"
                  id="break-duration"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(e.target.value)}
                  placeholder="60"
                  min={0}
                  max={480}
                  suppressHydrationWarning
                  className={cn(inputClass, breakError && "border-error")}
                />
                {breakError && (
                  <p className="mt-1 text-xs text-error" role="alert">
                    {breakError}
                  </p>
                )}
              </FieldWrap>
            </div>

            <details className="group mt-3 rounded-md border border-border bg-background">
              <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                Overtime &amp; pay options
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-2 gap-3 border-t border-border px-3 pb-3 pt-2">
                <FieldWrap>
                  <label htmlFor="overtime-threshold" className={labelClass}>
                    OT Threshold (hrs)
                  </label>
                  <input
                    type="number"
                    id="overtime-threshold"
                    value={overtimeThreshold}
                    onChange={(e) => setOvertimeThreshold(e.target.value)}
                    placeholder="8"
                    min={0}
                    max={24}
                    step={0.5}
                    suppressHydrationWarning
                    className={inputClass}
                  />
                </FieldWrap>
                <FieldWrap>
                  <label htmlFor="overtime-rate" className={labelClass}>
                    OT Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    id="overtime-rate"
                    value={overtimeRate}
                    onChange={(e) => setOvertimeRate(e.target.value)}
                    placeholder="Optional"
                    min={0}
                    step={0.01}
                    suppressHydrationWarning
                    className={cn(inputClass, rateError && "border-error")}
                  />
                  {rateError && (
                    <p className="mt-1 text-xs text-error" role="alert">
                      {rateError}
                    </p>
                  )}
                </FieldWrap>
              </div>
            </details>

            <div className="mt-3 flex gap-2">
              <Button variant="primary" size="sm" className="flex-1">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                Calculate
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reset
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col !p-4 sm:!p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                Results
              </h3>
              {showResults && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-8 px-2 text-xs"
                  aria-label="Copy results to clipboard"
                >
                  {copyStatus === "success" ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      Copied
                    </>
                  ) : copyStatus === "error" ? (
                    <>
                      <AlertCircle className="h-3.5 w-3.5 text-error" />
                      Failed
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              {showEmpty ? (
                <EmptyState />
              ) : result.error || breakError || rateError ? (
                <ErrorState message={result.error || breakError || rateError || ""} />
              ) : showResults ? (
                <ResultsDisplay
                  result={result}
                  startTime={startTime}
                  endTime={endTime}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </Card>
        </div>
      </SiteContainer>
    </section>
  );
}

function FieldWrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: CalculationMode;
  onChange: (mode: CalculationMode) => void;
}) {
  return (
    <div
      className="inline-flex rounded-md border border-border bg-secondary/50 p-0.5"
      role="group"
      aria-label="Calculation mode"
    >
      <button
        type="button"
        onClick={() => onChange("single")}
        suppressHydrationWarning
        className={cn(
          "flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
          mode === "single"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        Single
      </button>
      <button
        type="button"
        onClick={() => onChange("range")}
        suppressHydrationWarning
        className={cn(
          "flex items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
          mode === "range"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" />
        Range
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-border py-6 text-center">
      <Clock className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
      <p className="mt-2 text-sm font-medium text-foreground">Results appear here</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Updates live as you enter times
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center rounded-md border border-error/20 bg-error/5 py-6 text-center"
      role="alert"
    >
      <AlertCircle className="h-7 w-7 text-error" aria-hidden="true" />
      <p className="mt-2 text-sm font-medium text-foreground">Unable to calculate</p>
      <p className="mt-0.5 max-w-xs text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

function ResultsDisplay({
  result,
  startTime,
  endTime,
}: {
  result: CalculationResult;
  startTime: string;
  endTime: string;
}) {
  const decimalHours = (result.totalMinutes / 60).toFixed(2);
  const isMultiDay = result.dayCount > 1;

  return (
    <div className="animate-fade-in-up flex flex-1 flex-col gap-3">
      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        {result.dateLabel && (
          <p className="truncate text-xs font-medium text-primary">{result.dateLabel}</p>
        )}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              {isMultiDay ? "Total Hours" : "Hours Worked"}
            </p>
            <p className="text-2xl font-bold leading-tight tracking-tight text-foreground">
              {result.hoursDisplay}
            </p>
          </div>
          <p className="shrink-0 text-right text-xs text-muted-foreground">
            {decimalHours} hrs
            {isMultiDay && (
              <>
                <br />
                {result.dayCount}d × {result.dailyHoursDisplay}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {isMultiDay && (
          <ResultStat label="Days" value={String(result.dayCount)} highlight />
        )}
        <ResultStat
          label={isMultiDay ? "Per Day" : "Minutes"}
          value={isMultiDay ? result.dailyHoursDisplay : String(result.totalMinutes)}
        />
        <ResultStat
          label="Overtime"
          value={
            result.overtimeMinutes > 0
              ? `${Math.floor(result.overtimeMinutes / 60)}h ${result.overtimeMinutes % 60}m`
              : "—"
          }
          highlight={result.overtimeMinutes > 0}
        />
        <ResultStat
          label="Regular"
          value={`${Math.floor(result.regularMinutes / 60)}h ${result.regularMinutes % 60}m`}
        />
        {result.overtimePay !== undefined && result.overtimePay > 0 && (
          <ResultStat
            label="OT Pay"
            value={`$${result.overtimePay.toFixed(2)}`}
            highlight
            className="col-span-2 sm:col-span-4"
          />
        )}
      </div>

      <div className="mt-auto rounded-md bg-secondary/50 px-3 py-2.5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Summary
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-foreground">
          {result.summary}
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {formatTime12h(startTime)} → {formatTime12h(endTime)}
        </p>
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
  highlight = false,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-2",
        highlight
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-background",
        className,
      )}
    >
      <p className="text-[0.6875rem] font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-bold leading-tight text-foreground">{value}</p>
    </div>
  );
}
