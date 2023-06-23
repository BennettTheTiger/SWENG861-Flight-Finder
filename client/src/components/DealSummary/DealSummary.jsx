import React from 'react';
import { head, isEmpty } from 'ramda';
import useWordCasing from '../../utils/wordCase';
import './deal-summary.scss';

function DealSummary(props) {
  const dealData = head(props?.flightDealInfo?.data ?? []);

  function renderPriceMetrics() {
    const data = dealData?.priceMetrics || [];
    if (isEmpty(data)) {
      return null;
    }
    return (
      <>
        <div className="title">Price Quartile Breakdown</div>
        <hr />
        <div className="quartiles">
          {data.map((priceMetric) => {
            const { quartileRanking, amount } = priceMetric;
            if (!quartileRanking || !amount) {
              return null;
            }
            return (
              <div className="price-metric" key={quartileRanking}>
                <div className="quartile">{useWordCasing(quartileRanking)}</div>
                <div className={`amount ${quartileRanking.toLowerCase()}`}>{`$${amount}`}</div>
              </div>
            );
          })}
        </div>

      </>
    );
  }

  return (
    <section className="deal-summary">
      {renderPriceMetrics()}
    </section>
  );
}

DealSummary.propTypes = {
  flightDealInfo: {
    data: [],
  },
};

DealSummary.defaultProps = {
  flightDealInfo: {
    data: [
      {
        destiniation: {
          iataCode: '',
        },
        priceMetrics: {},
      },
    ],
  },
};

export default DealSummary;
