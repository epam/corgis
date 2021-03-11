import { useRef, useEffect } from 'react';

import { formatToNears } from '~helpers/nears';

export default function useHighestBid(forSale) {
  const highestBid = useRef();

  useEffect(() => {
    if (forSale && forSale.bids.length) {
      highestBid.current = forSale.bids.reduce(
        (curr, next) => (formatToNears(next.amount) > formatToNears(curr.amount) ? next : curr),
        forSale.bids[0],
      );
    }
  }, [forSale]);

  return highestBid.current;
}
