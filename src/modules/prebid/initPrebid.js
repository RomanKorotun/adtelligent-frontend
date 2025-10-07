export function initPrebidAds() {
  const adUnitTemplates = {
    "ad-frame-auth": {
      mediaTypes: { banner: { sizes: [[300, 250]] } },
      bids: [
        { bidder: "bidmatic", params: { source: 886409 } },
        {
          bidder: "korotun",
          params: { korotunId: 123456, cpm: 0.18, currency: "USD" },
        },
      ],
    },
    "ad-frame-newslist": {
      mediaTypes: { banner: { sizes: [[300, 250]] } },
      bids: [
        { bidder: "adtelligent", params: { aid: 350975 } },
        {
          bidder: "korotun",
          params: { korotunId: 123456, cpm: 10, currency: "USD" },
        },
      ],
    },
    "ad-frame-newsdetails": {
      mediaTypes: { banner: { sizes: [[300, 250]] } },
      bids: [
        { bidder: "adtelligent", params: { aid: 350975 } },
        { bidder: "bidmatic", params: { source: 886409 } },
      ],
    },
  };

  window.pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];
  window.__PREBID_LOGS__ = window.__PREBID_LOGS__ || [];

  const events = [
    "auctionInit",
    "bidRequested",
    "bidResponse",
    "bidWon",
    "bidTimeout",
    "auctionEnd",
  ];

  pbjs.que.push(() => {
    events.forEach((event) => {
      pbjs.onEvent(event, (data) => {
        window.__PREBID_LOGS__.push({ event, data: data || null });
        window.dispatchEvent(
          new CustomEvent("prebid-event", {
            detail: { event, data },
          })
        );
      });
    });
  });

  function renderAds() {
    const frames = Array.from(
      document.querySelectorAll("iframe[id^='ad-frame']")
    );

    frames.forEach((iframe) => {
      iframe.setAttribute("scrolling", "no");

      const template = adUnitTemplates[iframe.id];
      if (!template) return;

      if (!iframe.dataset.prebidRendered) {
        const adUnit = { ...template, code: iframe.id };

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

                window.dispatchEvent(
                  new CustomEvent("prebid-event", {
                    detail: {
                      event: "rendered",
                      data: { code: adUnit.code, bid: bids[0] },
                    },
                  })
                );

                iframe.dataset.prebidRendered = "true";
              } else {
                window.__PREBID_LOGS__.push({
                  event: "noBids",
                  data: { code: adUnit.code },
                });
              }

              setTimeout(() => {
                if (typeof window.PrebidLogsPage === "function") {
                  window.PrebidLogsPage();
                }
              }, 300);
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
