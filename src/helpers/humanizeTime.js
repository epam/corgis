import humanizeDuration from 'humanize-duration';

export default function humanizeTime(ms) {
  const milliseconds = (() => {
    let msStr = ms.toString();
    if (msStr.length > 13) {
      return msStr.slice(0, 13);
    } else if (msStr.length < 13) {
      for (let i = ms.length; i <= 13; i++) {
        msStr += '0';
      }
      return msStr;
    } else {
      return msStr;
    }
  })();

  return humanizeDuration(Date.now() - new Date(0).setMilliseconds(milliseconds), { round: true, largest: 1 });
}
