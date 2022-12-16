import moment from 'moment';

// scrolling to an element
export const scrollToElement = (querySelector: string) => {
  const element = document.querySelector(querySelector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
};

// create formatted date string
export const formatDate = (dateStyle: string, date: string | Date) => {
  const d: Date = typeof date === 'string' ? new Date(date) : date;
  const dateFormatted = moment(d).format(dateStyle);
  return dateFormatted;
};
