import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import colors from "tailwindcss/colors";

const RevenueChart = () => {
  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ["metrics", "daily-revenue-in-period"],
    queryFn: getDailyRevenueInPeriod,
  });
  console.log(
    "🚀 ~ RevenueChart ~ dailyRevenueInPeriod:",
    dailyRevenueInPeriod,
  );

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={88}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BT", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />

              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type={"linear"}
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors["violet"][500]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
