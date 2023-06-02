import moment from 'moment';

// scrolling to an element
export const scrollToElement = (
  behavior: 'auto' | 'smooth' = 'auto',
  verticalPosition: 'start' | 'center' | 'end' | 'nearest' = 'start',
  elementSelector: string = 'html'
) => {
  const element = document.querySelector(elementSelector);
  if (element) {
    element.scrollIntoView({
      behavior: behavior,
      block: verticalPosition,
      inline: 'nearest'
    });
  } else {
    console.error(
      'The DOM element cannot be not found based on the specified element identifier'
    );
  }
};

// create formatted date string
export const formatDate = (dateStyle: string, date: string | Date) => {
  const d: Date = typeof date === 'string' ? new Date(date) : date;
  const dateFormatted = moment(d).format(dateStyle);
  return dateFormatted;
};
