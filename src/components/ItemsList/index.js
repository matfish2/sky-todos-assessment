import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCompletedState, deleteItem } from '../../logic/todos';
import './styles.css';

export const ItemsList = ({ items, onToggleCompleted, onDelete, showCompleted }) => {
  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.filter(item=>showCompleted || !item.completed)
        .map((item) => <li key={item.id}><input type="checkbox" defaultChecked={item.completed}
        onClick={() => {
          onToggleCompleted(item.id)
        }
        }/>
        <span style={itemStyle(item.completed)}>{item.content}</span>
        <span className="itemsList-delete" onClick={()=> {
          onDelete(item.id)
        }}>X</span>
        </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  showCompleted: PropTypes.bool.isRequired
};

const itemStyle = (completed) => {
  return {
    textDecoration: completed ? 'line-through' : 'none'
  }
}

const mapStateToProps = (state) => {
  return { items: state.todos.items, showCompleted:state.todos.showCompleted };
};

const mapDispatchToProps = (dispatch) => ({
  onToggleCompleted: itemId => dispatch(toggleCompletedState(itemId)),
  onDelete: itemId => dispatch(deleteItem(itemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
