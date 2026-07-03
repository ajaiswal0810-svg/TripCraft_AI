// src/pages/Dashboard/BudgetCard.jsx
import { Bed, Utensils, Wallet } from "lucide-react";

const CATEGORY_ICON = { bed: Bed, utensils: Utensils };

const STATUS_STYLES = {
  "On Track": "bg-[#E8A23D]/15 text-[#B77A1F]",
  "Over Budget": "bg-[#E2572B]/15 text-[#E2572B]",
  "Under Budget": "bg-[#1F8A5F]/15 text-[#1F8A5F]",
};

/**
 * BudgetCard
 *
 * Total spend vs. budget with a status pill, the daily-average note, and a
 * progress bar per spending category.
 *
 * Props:
 *  - budget: dashboardMock.budget
 */
const BudgetCard = ({ budget }) => {
  if (!budget) return null;

  const spentPercent = Math.min(100, (budget.totalSpent / budget.totalBudget) * 100);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-semibold text-[#0F3D4D]">
          <Wallet className="h-4 w-4 text-[#0F3D4D]/50" /> Budget Analysis
        </h3>
        {budget.status && (
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
              STATUS_STYLES[budget.status] || "bg-[#0F3D4D]/10 text-[#0F3D4D]"
            }`}
          >
            {budget.status}
          </span>
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-medium text-[#0F3D4D]/50">Total Spent</span>
          <span className="text-sm font-semibold text-[#0F3D4D]">
            {budget.currency}
            {budget.totalSpent.toLocaleString()} / {budget.currency}
            {budget.totalBudget.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#0F3D4D]/10">
          <div
            className="h-full rounded-full bg-[#0F3D4D] transition-all duration-500"
            style={{ width: `${spentPercent}%` }}
          />
        </div>
        {budget.note && <p className="mt-2 text-xs text-[#0F3D4D]/55">{budget.note}</p>}
      </div>

      {budget.categories?.length > 0 && (
        <div className="mt-5 space-y-4 border-t border-[#0F3D4D]/10 pt-4">
          {budget.categories.map((cat) => {
            const Icon = CATEGORY_ICON[cat.icon];
            return (
              <div key={cat.id} className="flex items-center gap-3">
                {Icon && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F3D4D]/5">
                    <Icon className="h-4 w-4 text-[#0F3D4D]" />
                  </span>
                )}
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#0F3D4D]">{cat.label}</p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0F3D4D]/10">
                    <div
                      className="h-full rounded-full bg-[#E2572B]"
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BudgetCard;