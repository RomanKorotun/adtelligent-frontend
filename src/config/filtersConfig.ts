export const filtersConfig = [
  { name: "Hour", value: "all" },
  { name: "Auctions", value: "auctionInit" },
  { name: "Bidders", value: "bidders" },
  { name: "Avg CPM", value: "avgCpm" },
  { name: "Max CPM", value: "maxCpm" },
  { name: "Revenue", value: "revenue" },
  { name: "Revenue per slot", value: "revenuePerSlot" },
  { name: "Max CPM Winner", value: "maxCpmWinner" },
  { name: "Top Winner by Count", value: "topWinnerByCount" },
  { name: "Fill Rate", value: "fillRate" },
  { name: "No Bid", value: "noBid" },
  { name: "ECPM", value: "ECPM" },
  { name: "Total Bids", value: "totalBids" },
  { name: "Total Impressions", value: "totalImpressions" },
] as const;

export type Filter = (typeof filtersConfig)[number];
