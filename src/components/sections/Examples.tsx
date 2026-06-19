import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteContainer } from "@/components/ui/SiteContainer";
import { calculateHours, formatTime12h } from "@/lib/calculator";
import { EXAMPLES } from "@/lib/constants";

export function Examples() {
  const rows = EXAMPLES.map((example) => {
    const result = calculateHours({
      startTime: example.startTime,
      endTime: example.endTime,
      breakMinutes: example.breakMinutes,
      overtimeThresholdHours: 8,
    });
    return { ...example, result };
  });

  return (
    <section
      id="examples"
      className="section-padding"
      aria-labelledby="examples-heading"
    >
      <SiteContainer>
        <SectionHeading
          label="Examples"
          title="Real-World Examples"
          subtitle="See how our hours calculator handles common work schedules, including standard days, extended shifts, and overnight work."
        />

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th scope="col" className="px-6 py-4 text-[0.9375rem] font-semibold text-foreground">
                    Example
                  </th>
                  <th scope="col" className="px-6 py-4 text-[0.9375rem] font-semibold text-foreground">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-4 text-[0.9375rem] font-semibold text-foreground">
                    Break
                  </th>
                  <th scope="col" className="px-6 py-4 text-[0.9375rem] font-semibold text-foreground">
                    Total Hours
                  </th>
                  <th scope="col" className="px-6 py-4 text-[0.9375rem] font-semibold text-foreground">
                    Overtime
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index % 2 === 0 ? "bg-card" : "bg-secondary/20"}
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-foreground">{row.label}</p>
                      {row.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {row.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-5 text-[0.9375rem] text-foreground">
                      {formatTime12h(row.startTime)}
                      <span className="mx-2 text-muted-foreground" aria-hidden="true">
                        →
                      </span>
                      {formatTime12h(row.endTime)}
                    </td>
                    <td className="px-6 py-5 text-[0.9375rem] text-muted-foreground">
                      {row.breakMinutes} min
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-md bg-primary/10 px-3 py-1 text-[0.9375rem] font-semibold text-primary">
                        {row.result.hoursDisplay}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[0.9375rem] text-foreground">
                      {row.result.overtimeMinutes > 0
                        ? `${Math.floor(row.result.overtimeMinutes / 60)}h ${row.result.overtimeMinutes % 60}m`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
