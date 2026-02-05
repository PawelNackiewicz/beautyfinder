import { Card, CardContent, Button } from "@repo/ui/components";
import type { VouchersAndRewards } from "../types";

interface VouchersAndRewardsCardProps {
  data: VouchersAndRewards;
}

export function VouchersAndRewardsCard({ data }: VouchersAndRewardsCardProps) {
  return (
    <Card className="mt-8 bg-gradient-to-br from-[#0d2818] via-[#1a4a30] to-[#163525] text-white border border-amber-700/20 overflow-hidden shadow-xl shadow-emerald-950/40">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Moje Bony i Zniżki</h3>
          <span className="text-2xl">🎁</span>
        </div>

        {/* Gift Voucher - highlighted card */}
        <div className="bg-[#2a4a2a] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-base">{data.voucher.title}</h4>
              <p className="text-sm text-gray-300 mt-1">
                Ważny do: {data.voucher.validUntil}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Kod: <span className="font-mono">{data.voucher.code}</span>
              </p>
            </div>
            <span className="text-2xl font-bold text-green-300">
              {data.voucher.amount}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full text-primary"
          >
            Użyj teraz
          </Button>
        </div>

        {/* Loyalty Discount */}
        <div className="bg-linear-to-r from-[#1a4030] via-[#295a3e] to-[#1e4a35] rounded-lg p-4 mb-4 border border-amber-500/15 shadow-md shadow-amber-900/10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-base">
                {data.loyaltyDiscount.title}
              </h4>
              <p className="text-sm text-gray-300 mt-1">
                {data.loyaltyDiscount.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-300">
                {data.loyaltyDiscount.percentage}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>
                {data.loyaltyDiscount.visitsToNext} wizyty do następnej zniżki
              </span>
              <span>3/5</span>
            </div>
            <div className="w-full bg-[#1a2e1a] rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Loyalty Points */}
        <div className="bg-[#2a4a2a] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-base">
                {data.loyaltyPoints.title}
              </h4>
              <p className="text-sm text-gray-300 mt-1">
                {data.loyaltyPoints.subtitle}
              </p>
            </div>
            <span className="text-2xl font-bold text-green-300">
              {data.loyaltyPoints.points}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
