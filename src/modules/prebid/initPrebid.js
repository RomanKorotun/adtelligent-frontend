export function initPrebidAds() {
  const adUnitTemplate = {
    mediaTypes: { banner: { sizes: [[300, 250]] } },
    bids: [
      { bidder: "adtelligent", params: { aid: 350975 } },
      { bidder: "bidmatic", params: { source: 886409 } },
    ],
  };

  window.pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];

  window.__PREBID_LOGS__ = window.__PREBID_LOGS__ || [];

  pbjs.que.push(() => {
    const events = [
      "auctionInit",
      "bidRequested",
      "bidResponse",
      "bidTimeout",
      "auctionEnd",
    ];

    events.forEach((event) => {
      pbjs.onEvent(event, (data) => {
        window.__PREBID_LOGS__.push({ event, data: data || null });
      });
    });
  });

  function renderAds() {
    const frames = Array.from(
      document.querySelectorAll("iframe[id^='ad-frame']")
    );

    frames.forEach((iframe) => {
      if (!iframe.dataset.prebidRendered) {
        const adUnit = { ...adUnitTemplate, code: iframe.id };

        pbjs.que.push(() => {
          pbjs.addAdUnits([adUnit]);

          pbjs.requestBids({
            bidsBackHandler: () => {
              const bids = pbjs.getHighestCpmBids(adUnit.code);

              if (bids.length > 0 && iframe.contentWindow) {
                const doc = iframe.contentWindow.document;
                doc.open();
                pbjs.renderAd(doc, bids[0].adId);
                doc.close();

                window.__PREBID_LOGS__.push({
                  event: "rendered",
                  data: { code: adUnit.code, bid: bids[0] },
                });

                iframe.dataset.prebidRendered = "true";
              } else {
                window.__PREBID_LOGS__.push({
                  event: "noBids",
                  data: { code: adUnit.code },
                });
              }

              if (typeof window.PrebidLogsPage === "function") {
                window.PrebidLogsPage();
              }
            },
          });
        });
      }
    });
  }

  renderAds();

  const observer = new MutationObserver(renderAds);
  observer.observe(document.body, { childList: true, subtree: true });
}
