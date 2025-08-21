import { getPopularProducts } from "@/api/get-popular-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "lucide-react";
import { ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import type { PieLabelProps } from "recharts/types/polar/Pie";
import colors from "tailwindcss/colors";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

const PopularProductsChart = () => {
  const { data: popularProducts } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populates
          </CardTitle>

          <BarChart className="text-muted-foreground h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        {popularProducts && (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
                dataKey="amount"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={(props: PieLabelProps) => {
                  const {
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  } = props;

                  // Evita erro em tempo de execução, garantindo que os dados estejam completos
                  if (
                    cx === undefined ||
                    cy === undefined ||
                    midAngle === undefined ||
                    innerRadius === undefined ||
                    outerRadius === undefined ||
                    value === undefined ||
                    index === undefined ||
                    !popularProducts[index]
                  ) {
                    return null;
                  }

                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  const product = popularProducts[index].product;

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {product.length > 12
                        ? product.substring(0, 12) + "..."
                        : product}{" "}
                      ({value})
                    </text>
                  );
                }}
              >
                {popularProducts.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx]}
                    className="stroke-card hover:opacity-80 dark:bg-[#18181b]"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PopularProductsChart;
