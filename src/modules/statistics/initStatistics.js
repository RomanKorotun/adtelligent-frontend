import { sendStatToServer } from "./sendStatToServer";

export const initStatistics = () => {
  sendStatToServer({
    event: "apInit",
    data: {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
    },
  });

  sendStatToServer({
    event: "prebitInit",
    data: {
      prebit_version: window.pbjs?.version,
    },
  });

  window.addEventListener("prebid-event", (evt) => {
    const { event, data } = evt.detail;

    let filteredData = {};

    switch (event) {
      case "auctionInit":
        filteredData = {
          auctionId: data.auctionId,
        };
        break;

      case "bidRequested":
        filteredData = {
          auctionId: data.auctionId,
          bidderCode: data.bidderCode,
        };
        break;

      case "bidResponse":
        filteredData = {
          auctionId: data.auctionId,
          bidderCode: data.bidderCode,
          cpm: data.cpm,
          currency: data.currency,
          width: data.width,
          height: data.height,
          mediaType: data.mediaType,
          responseTimestamp: data.responseTimestamp,
        };
        break;

      case "auctionEnd":
        filteredData = {
          auctionId: data.auctionId,
          bidsReceivedCount: data.bidsReceived?.length || 0,
          bidsRejectedCount: data.bidsRejected?.length || 0,
          noBidsCount: data.noBids?.length || 0,
        };
        break;

      case "rendered":
        filteredData = {
          auctionId: data.bid.auctionId,
          bidder: data.bid.bidder,
          cpm: data.bid.cpm,
          width: data.bid.width,
          height: data.bid.height,
        };
        break;

      case "bidWon":
        filteredData = {
          auctionId: data.auctionId,
          adUnitCode: data.adUnitCode,
          bidder: data.bidder,
          cpm: data.cpm,
          width: data.width,
          height: data.height,
        };
        break;

      default:
        filteredData = data;
    }

    sendStatToServer({
      event,
      data: filteredData,
    });
  });
};
