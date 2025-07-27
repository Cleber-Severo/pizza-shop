import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart } from 'lucide-react'
import { ResponsiveContainer, Pie, PieChart, Cell } from 'recharts'
import type { PieLabelProps } from 'recharts/types/polar/Pie'
import colors from 'tailwindcss/colors'


const data = [
  { product: 'Pepperoni', amount: 40 },
  { product: 'Mussarela', amount: 30 },
  { product: 'Marguerita', amount: 50 },
  { product: 'Calabresa', amount: 16 },
  { product: '4 Queijos', amount: 26 },
]

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

const PopularProductsChart = () => {
  return (
    <Card className='col-span-3'>
      <CardHeader className=' pb-8'>
        <div className='flex items-center justify-between'>
          <CardTitle className='font-medium text-base'>Produtos populates</CardTitle>

          <BarChart className='w-4 h-4 text-muted-foreground' />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width='100%' height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey='amount'
              nameKey='product'
              cx='50%'
              cy='50%'
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
                } = props

                // Evita erro em tempo de execução, garantindo que os dados estejam completos
                if (
                  cx === undefined || cy === undefined ||
                  midAngle === undefined || innerRadius === undefined ||
                  outerRadius === undefined || value === undefined ||
                  index === undefined || !data[index]
                ) {
                  return null
                }

                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                const product = data[index].product

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {product.length > 12
                      ? product.substring(0, 12) + '...'
                      : product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {data.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[idx]}
                  className='stroke-card dark:bg-[#18181b] hover:opacity-80'
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

    </Card >
  )
}

export default PopularProductsChart
