import rangeWrapper from './rangeWrapper';

const findAncestor = (element, className) => {
  let node = element;
  while (node && !node.classList.contains(className)) {
    node = node.parentElement;
  }
  return node;
};

export default {
  get(range, parentCssSelector, pageAttribute) {
    const elementWrapper = document.createElement('span');
    const wrapped = rangeWrapper.wrap(range, elementWrapper);

    let parentNodeRect = {
      top: 0,
      left: 0,
      scrollTop: 0,
      scrollLeft: 0,
    };

    const rects = wrapped.nodes.map((node) => {
      const parentNode = findAncestor(node, parentCssSelector);
      if (parentNode) {
        parentNodeRect = parentNode.getBoundingClientRect();
        parentNodeRect.scrollTop = parentNode.scrollTop;
        parentNodeRect.scrollLeft = parentNode.scrollLeft;
        parentNodeRect.page = parentNode.getAttribute(pageAttribute);
      }
      const rect = node.getClientRects()[0];
      return {
        top: rect.top + (parentNodeRect.scrollTop - parentNodeRect.top),
        left: rect.left + (parentNodeRect.scrollLeft - parentNodeRect.left),
        width: rect.width,
        height: rect.height,
        page: parentNodeRect.page,
      };
    });

    wrapped.unwrap();
    return rects;
  },
};
