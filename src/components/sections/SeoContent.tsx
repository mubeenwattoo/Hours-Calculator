import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";

export function SeoContent() {
  return (
    <section
      id="guide"
      className="section-padding bg-secondary/40"
      aria-labelledby="guide-heading"
    >
      <SiteContainer narrow>
        <SectionHeading
          label="Guide"
          title="Complete Guide to Calculating Work Hours"
          subtitle="Learn how hours calculators work, why they matter, and how to avoid common time-tracking mistakes."
        />

        <article className="prose-content space-y-10 text-muted-foreground">
          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              What Is an Hours Calculator?
            </h3>
            <p className="mt-3">
              An hours calculator is a digital tool that computes the total time worked
              between a start time and end time, automatically accounting for breaks,
              overtime thresholds, and special cases like overnight shifts. Instead of
              manually counting hours on a timesheet or doing mental math at the end of a
              long workday, you enter your times and receive instant, accurate results.
            </p>
            <p className="mt-3">
              HourCalc is designed specifically for this purpose. Whether you need to
              calculate hours for a single shift or verify your weekly totals, our free
              online hours calculator delivers precise results in seconds — no spreadsheet
              formulas or calculator apps required.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              Why Is an Hours Calculator Useful?
            </h3>
            <p className="mt-3">
              Accurate time tracking is the foundation of fair compensation. Employees
              rely on correct hour calculations to ensure they are paid for every minute
              worked. Freelancers and contractors need precise records for client billing
              and invoicing. Small business owners use hours calculators to prepare
              payroll and maintain compliance with labor regulations.
            </p>
            <p className="mt-3">
              Manual calculation is error-prone. A simple mistake — forgetting to subtract
              a lunch break, miscalculating an overnight shift, or rounding incorrectly —
              can result in underpayment or overpayment. An automated hours calculator
              eliminates these errors and provides a clear audit trail you can reference
              when questions arise.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              How to Calculate Hours Worked
            </h3>
            <p className="mt-3">
              The basic formula for calculating hours worked is straightforward: subtract
              your start time from your end time, then deduct any unpaid break time. Here
              is a step-by-step breakdown:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Record your start time</strong> — the
                moment you begin work-related activities.
              </li>
              <li>
                <strong className="text-foreground">Record your end time</strong> — when
                you finish your last work task for the period.
              </li>
              <li>
                <strong className="text-foreground">Calculate the time span</strong> — if
                your end time is earlier than your start time, the shift crosses midnight
                and the end time belongs to the next day.
              </li>
              <li>
                <strong className="text-foreground">Subtract break time</strong> — deduct
                unpaid lunch breaks, rest periods, and any other non-work intervals.
              </li>
              <li>
                <strong className="text-foreground">Convert to hours</strong> — express
                the result in hours and minutes, or as decimal hours for payroll systems
                (e.g., 7 hours 30 minutes = 7.50 hours).
              </li>
            </ol>
            <p className="mt-4">
              For example, working from 9:00 AM to 5:00 PM with a 60-minute unpaid lunch
              break equals 7 hours worked. Our calculator performs all these steps
              automatically and displays results in both formats.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              How Overtime Calculations Work
            </h3>
            <p className="mt-3">
              Overtime refers to hours worked beyond a standard threshold, typically 8
              hours per day or 40 hours per week in the United States. When you exceed this
              threshold, those additional hours may qualify for overtime pay — usually
              calculated at 1.5 times your regular hourly rate.
            </p>
            <p className="mt-3">
              To calculate overtime with HourCalc, enter your start time, end time, and
              break duration as usual. The calculator compares your total hours against the
              overtime threshold (default 8 hours) and separates regular hours from
              overtime hours. If you provide an hourly rate, we also estimate your
              overtime pay at the standard 1.5× multiplier.
            </p>
            <p className="mt-3">
              Important note: overtime rules vary significantly by country, state, and
              employer policy. Some jurisdictions use weekly thresholds instead of daily
              ones, and certain roles may be exempt from overtime requirements. Always
              verify calculations against your employment agreement and applicable labor
              laws.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              Common Mistakes People Make
            </h3>
            <p className="mt-3">
              Even experienced professionals make time-tracking errors. Here are the most
              common mistakes and how to avoid them:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Forgetting to subtract breaks</strong>{" "}
                — Always deduct unpaid lunch and rest periods from your total time span.
              </li>
              <li>
                <strong className="text-foreground">MisHandling overnight shifts</strong>{" "}
                — When a shift crosses midnight, the end time is on the following day.
                Failing to account for this leads to negative or incorrect totals.
              </li>
              <li>
                <strong className="text-foreground">Rounding too aggressively</strong> —
                Rounding to the nearest hour can accumulate significant errors over a pay
                period. Use minute-level precision instead.
              </li>
              <li>
                <strong className="text-foreground">Mixing time formats</strong> — Switching
                between 12-hour and 24-hour formats causes confusion. Stick to one format
                or use a calculator that handles conversion automatically.
              </li>
              <li>
                <strong className="text-foreground">Ignoring overtime thresholds</strong> —
                Not separating regular and overtime hours can lead to payroll discrepancies
                and compliance issues.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground sm:text-[1.375rem]">
              Benefits for Employees and Freelancers
            </h3>
            <p className="mt-3">
              For employees, an hours calculator provides peace of mind. Before submitting
              your timesheet, you can verify that your recorded hours match your actual
              work time. If there is a discrepancy on your paycheck, you have documented
              calculations to support a conversation with HR or your manager.
            </p>
            <p className="mt-3">
              Freelancers and independent contractors benefit even more directly. Accurate
              hour tracking is essential for client billing, project estimation, and tax
              documentation. HourCalc lets you copy results instantly and paste them into
              invoices, proposals, or accounting software — saving time and presenting a
              professional image to clients.
            </p>
            <p className="mt-3">
              Both groups appreciate that HourCalc requires no registration, stores no
              personal data, and works on any device. Whether you are at your desk, on a
              job site, or working remotely, you can calculate your hours in seconds and
              get back to what matters most — your work.
            </p>
          </div>
        </article>
      </SiteContainer>
    </section>
  );
}
