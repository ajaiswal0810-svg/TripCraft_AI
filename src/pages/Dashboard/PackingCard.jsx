// src/pages/Dashboard/PackingCard.jsx
import { Umbrella, Stethoscope, Camera, Shirt, CheckCircle2, Circle } from "lucide-react";
import Button from "../../components/Button";

const CATEGORY_ICON = {
  umbrella: Umbrella,
  "briefcase-medical": Stethoscope,
  camera: Camera,
  shirt: Shirt,
};

/**
 * PackingCard
 *
 * Packing checklist overview — overall completion count, "Manage List" /
 * "Add Item" actions, and a tile per category showing how many items in
 * that category are checked off.
 *
 * Props:
 *  - packingChecklist: dashboardMock.packingChecklist
 */
const PackingCard = ({ packingChecklist }) => {
  if (!packingChecklist) return null;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#0F3D4D]">Packing Checklist</h3>
          <p className="mt-1 text-xs text-[#0F3D4D]/50">
            {packingChecklist.completed} of {packingChecklist.total} items completed
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Manage List
          </Button>
          <Button variant="primary" size="sm">
            Add Item
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {packingChecklist.categories.map((cat) => {
          const Icon = CATEGORY_ICON[cat.icon] || Circle;
          const isDone = cat.completed === cat.total;
          return (
            <div
              key={cat.id}
              className={`rounded-xl border p-4 ${
                isDone ? "border-[#0F3D4D]/10 bg-[#0F3D4D]/[0.03]" : "border-[#0F3D4D]/15 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-[#0F3D4D]/60" />
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-[#1F8A5F]" />
                ) : (
                  <Circle className="h-4 w-4 text-[#0F3D4D]/25" />
                )}
              </div>
              <p className="mt-3 text-sm font-medium text-[#0F3D4D]">{cat.label}</p>
              <p className="mt-0.5 text-xs text-[#0F3D4D]/50">
                {cat.completed}/{cat.total} items
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackingCard;