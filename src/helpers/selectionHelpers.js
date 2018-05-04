// TEST!!!
import rangeClientRects from './rangeClientRects';

const isTextSelected = () => window.getSelection().toString() !== '';

export default {
  isTextSelected,

  getSelection: (pageClass, pageNumberProperty) => {
    if (isTextSelected()) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      return rangeClientRects.get(range, pageClass, `data-${pageNumberProperty}`);
    }

    return [];
  },

  unselect: () => {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
      }
    }
  },
};
