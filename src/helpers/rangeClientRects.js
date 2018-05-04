import rangeWrapper from './rangeWrapper';

export default {
  get(range, parentNode) {
    const elementWrapper = document.createElement('span');
    const wrapped = rangeWrapper.wrap(range, elementWrapper);

    let parentNodeRect = {
      top: 0,
      left: 0,
      scrollTop: 0,
      scrollLeft: 0,
    };

    if (parentNode) {
      parentNodeRect = parentNode.getBoundingClientRect();
      parentNodeRect.scrollTop = parentNode.scrollTop;
      parentNodeRect.scrollLeft = parentNode.scrollLeft;
    }

    const rects = wrapped.nodes.map((node) => {
      const rect = node.getClientRects()[0];
      return {
        top: rect.top + (parentNodeRect.scrollTop - parentNodeRect.top),
        left: rect.left + (parentNodeRect.scrollLeft - parentNodeRect.left),
        width: rect.width,
        height: rect.height,
      };
    });

    wrapped.unwrap();
    return rects;
  },
};
