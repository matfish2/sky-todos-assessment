import React from 'react';
import { shallow } from 'enzyme';
import { CompletedFilter } from '../index';

const defaultProps = {
 onToggle() {},
 showCompleted:true   
}

describe('CompletedFilter', () => {
    it('renders without crashing', () => {
        shallow(<CompletedFilter {...defaultProps} />);
      });

    it('Should call toggle completed visibility when the button is clicked', ()=>{
        const onToggleMock = jest.fn();        
        const renderedItem = shallow(<CompletedFilter {...defaultProps} items={[]} onToggle={onToggleMock} />);
        renderedItem.find('.completedFilter-button').simulate('click');
        expect(onToggleMock.mock.calls.length).toBe(1);
    });
})