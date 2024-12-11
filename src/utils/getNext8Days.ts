import dayjs from 'dayjs';

function getNext8Days() {
  const next8Days = [];
  for (let i = 0; i < 8; i++) {
    const nextDay = dayjs().add(i, 'day');
    next8Days.push({
      date: nextDay.format('ddd, MMM D'),
    });
  }
  return next8Days;
}

export { getNext8Days };
