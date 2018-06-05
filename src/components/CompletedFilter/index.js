import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCompletedVisibility } from '../../logic/todos';
import './styles.css';

export const CompletedFilter = ({onToggle, showCompleted}) => {
    return (
    <button className="completedFilter-button" onClick={onToggle}>{showCompleted?'Hide Completed':'Show Completed'}</button>
  );
};

CompletedFilter.propTypes = {
    onToggle: PropTypes.func.isRequired,
    showCompleted: PropTypes.bool.isRequired
  };

const mapStateToProps = (state) => {
    return { showCompleted: state.todos.showCompleted };
  };

  
const mapDispatchToProps = (dispatch) => ({
    onToggle: () => dispatch(toggleCompletedVisibility()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompletedFilter);
