import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    Dot,
} from "recharts";

const data = [
    { month: "Jan", value: 28 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 52 },
    { month: "Apr", value: 46 },
    { month: "May", value: 55 },
    { month: "Jun", value: 60 },
    { month: "Jul", value: 73 },
    { month: "Aug", value: 62 },
];

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-sm text-white shadow-lg">
            <div className="text-white/70">{label}</div>
            <div className="font-semibold">{payload[0].value}%</div>
        </div>
    );
}

// Punto resaltado para el “mes marcado”
function ActiveDot(props) {
    const { cx, cy } = props;
    return (
        <>
            {/* halo */}
            <circle cx={cx} cy={cy} r={10} fill="rgba(255, 98, 71, 0.15)" />
            {/* punto */}
            <circle cx={cx} cy={cy} r={5} fill="#ff6247" stroke="white" strokeWidth={2} />
        </>
    );
}

export default function ElectricityConsumedChart({ selectedMonth }) {
    const highlightValue = data.find((d) => d.month === selectedMonth)?.value ?? 0;

    return (
        <div className="w-full rounded-2xl bg-[#0b1220] p-4 text-white shadow-lg">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <div className="text-sm text-white/70">Consumo de electricidad</div>
                </div>
                <div className="text-sm font-semibold text-[#ff6247]">{highlightValue}% Gasto</div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="150%">
                    <AreaChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillOrange" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ff6247" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#ff6247" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="month"
                            tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            domain={[0, 75]}
                            tickFormatter={(v) => `${v}%`}
                            tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />

                        {/* Línea vertical punteada en el mes resaltado */}
                        <ReferenceLine
                            x={selectedMonth}
                            stroke="rgba(255,255,255,0.25)"
                            strokeDasharray="4 6"
                        />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#ff6247"
                            strokeWidth={2.5}
                            fill="url(#fillOrange)"
                            dot={false}
                            activeDot={<ActiveDot />}
                        />

                        {/* Punto fijo en el mes resaltado (si quieres que siempre se vea aunque no haya hover) */}
                        <Dot
                            cx={0}
                            cy={0}
                            r={0}
                        // Recharts no “fija” Dot fácil por props; si quieres fijo 100%,
                        // te lo armo con Customized layer. (Dímelo y te lo dejo pro.)
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
