import rangeClientRects from '../rangeClientRects';
import wrapper from '../rangeWrapper';

const getClientRects = () => [{
  top: 10,
  left: 11,
  width: 12,
  height: 13,
}];

const relativeNodeRect = {
  top: 6,
  left: 8,
  width: 12,
  height: 13,
};

const mockPage = (id) => {
  const page = document.getElementById(id);
  page.getBoundingClientRect = () => ({
    top: 5,
    left: 5,
  });
  page.scrollTop = 1;
  page.scrollLeft = 2;
};

describe('rangeClientRects', () => {
  let wrapped;
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <div class='page' id='page1' data-page='1'>
          <div id='node1'></div>
          <div>
            <div id='node2'></div>
          </div>
        </div>
        <div class='page' id='page2' data-page='2'>
          <div id='node3'></div>
        </div>
      </div>
    `;

    const node1 = document.getElementById('node1');
    node1.getClientRects = getClientRects;
    const node2 = document.getElementById('node2');
    node2.getClientRects = getClientRects;
    const node3 = document.getElementById('node3');
    node3.getClientRects = getClientRects;

    mockPage('page1');
    mockPage('page2');

    wrapped = {
      unwrap: () => {
        wrapped.nodes = [];
      },
      nodes: [node1, node2, node3],
    };
  });

  it('should return all client rects based on a range selection', () => {
    const range = 'RangeObject';
    spyOn(wrapper, 'wrap').and.returnValue(wrapped);

    const elementWrapper = document.createElement('span');
    const rects = rangeClientRects.get(range);
    expect(wrapper.wrap).toHaveBeenCalledWith(elementWrapper, range);
    expect(rects).toEqual([
      getClientRects()[0],
      getClientRects()[0],
      getClientRects()[0],
    ]);
    expect(wrapped.nodes).toEqual([]);
  });

  describe('when passing a parent node selector', () => {
    it('should compute top and left relative to the parent and set the page information to the rect', () => {
      const range = 'RangeObject';
      spyOn(wrapper, 'wrap').and.returnValue(wrapped);

      const elementWrapper = document.createElement('span');
      const rects = rangeClientRects.get(range, 'page', 'data-page');
      expect(wrapper.wrap).toHaveBeenCalledWith(elementWrapper, range);
      expect(rects).toEqual([
        Object.assign({}, relativeNodeRect, { page: '1' }),
        Object.assign({}, relativeNodeRect, { page: '1' }),
        Object.assign({}, relativeNodeRect, { page: '2' }),
      ]);
    });
  });
});
