import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onDelete() {},
  onToggleCompleted() {},
  showCompleted: true
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should call onDelete with the item id', () => {
    const onDeleteMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} onDelete={onDeleteMock} />);
    renderedItem.find("li").first().find('.itemsList-delete').simulate('click');
    expect(onDeleteMock.mock.calls.length).toBe(1);
    expect(onDeleteMock.mock.calls[0][0]).toBe(1);   
  });


  it('should display completed items when completed visibility filter is set to true', () => {
    completedFilterTest(true, 2);
  });

  it('should not display completed items when completed visibility filter is set to false', () => {
    completedFilterTest(false, 1);
  })

});

function completedFilterTest(showCompleted, expectedLength) {
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: true }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} showCompleted={showCompleted} />);
    expect(renderedItem.find('li')).toHaveLength(expectedLength);
}

