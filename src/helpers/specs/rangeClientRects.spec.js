import rangeClientRects from '../rangeClientRects';
import wrapper from '../rangeWrapper';

const node = {
  getClientRects() {
    return [{
      top: 10,
      left: 11,
      width: 12,
      height: 13,
    }];
  },
};

const parentNode = {
  getBoundingClientRect() {
    return {
      top: 5,
      left: 5,
    };
  },
  scrollTop: 1,
  scrollLeft: 2,
};

const relativeNodeRect = {
  top: 6,
  left: 8,
  width: 12,
  height: 13,
};

describe('rangeClientRects', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = {
      unwrap: () => {
        wrapped.nodes = [];
      },
      nodes: [node, node, node],
    };
  });
  it('should return all client rects based on a range selection', () => {
    const range = 'RangeObject';
    spyOn(wrapper, 'wrap').and.returnValue(wrapped);

    const elementWrapper = document.createElement('span');
    const rects = rangeClientRects.get(range);
    expect(wrapper.wrap).toHaveBeenCalledWith(range, elementWrapper);
    expect(rects).toEqual([
      node.getClientRects()[0],
      node.getClientRects()[0],
      node.getClientRects()[0],
    ]);
    expect(wrapped.nodes).toEqual([]);
  });

  describe('when passing a parent node', () => {
    it('should compute top and left relative to the parent', () => {
      const range = 'RangeObject';
      spyOn(wrapper, 'wrap').and.returnValue(wrapped);

      const elementWrapper = document.createElement('span');
      const rects = rangeClientRects.get(range, parentNode);
      expect(wrapper.wrap).toHaveBeenCalledWith(range, elementWrapper);
      expect(rects).toEqual([relativeNodeRect, relativeNodeRect, relativeNodeRect]);
    });
  });
});
