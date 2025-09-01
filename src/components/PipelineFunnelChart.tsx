import { Box, Typography } from "@mui/material";
import { ResponsiveStream } from "@nivo/stream";

const data = [
  { stage: "Qualified", closedWon: 198, proposal: 50, pov: 85, discovery: 247, qualified: 420 },
  { stage: "Discovery", closedWon: 198, proposal: 50, pov: 85, discovery: 247, qualified: 0 },
  { stage: "POV", closedWon: 198, proposal: 50, pov: 85, discovery: 0, qualified: 0 },
  { stage: "Proposal", closedWon: 198, proposal: 50, pov: 0, discovery: 0, qualified: 0 },
  { stage: "Closed Won", closedWon: 198, proposal: 0, pov: 0, discovery: 0, qualified: 0 },
];

const stages = [
  {
    name: "Qualified",
    amount: "$16.5M",
    summary: "1,000 - 100%",
  },
  {
    name: "Discovery",
    amount: "$9.57M",
    summary: "580 - 58%",
  },
  {
    name: "POV",
    amount: "$5.54M",
    summary: "333 - 33%",
  },
  {
    name: "Proposal / Negotiation",
    amount: "$4.09M",
    summary: "248 - 24.8%",
  },
  {
    name: "Closed Won",
    amount: "$3.27M",
    summary: "198 - 19.8%",
  },
];

export default function PipelineFunnelChart() {
  return (
    <Box sx={{ height: 260, position: "relative" }}>
      <ResponsiveStream
        data={data}
        keys={["qualified", "discovery", "pov", "proposal", "closedWon"]}
        margin={{ top: 80, right: 80, bottom: 60, left: 80 }}
        axisLeft={null}
        axisBottom={null}
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        colors={["#e5f5db", "#c8e7b7", "#a0d47e", "#6db640", "#3f8020"]}
        offset="none"
        isInteractive={false}
      />
      {/* top labels */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {stages.map((stage) => (
          <Box key={stage.name} textAlign="center">
            <Typography variant="subtitle2">{stage.name}</Typography>
            <Typography fontWeight={600}>{stage.amount}</Typography>
          </Box>
        ))}
      </Box>
      {/* bottom labels */}
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {stages.map((stage) => (
          <Typography key={stage.name} variant="caption">
            {stage.summary}
          </Typography>
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          textAlign: "right",
        }}
      >
        <Typography fontWeight={600}>198 / 1,000</Typography>
        <Typography variant="caption">Opportunities closed</Typography>
        <Typography variant="caption">19.8%</Typography>
      </Box>
    </Box>
  );
}

