import { quotes } from '~assets/quotes/quotes';

import { getRandomQuoteId } from '~helpers/quotes';

/**
 * for simplicity, indexes are used instead of unique id
 * @param {string} id
 */
export default function getQuoteById(id) {
  return quotes[Number(id)] || quotes[getRandomQuoteId()];
}
