import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';

class App extends Component {
    render() {
        return <div className="App">Hello world</div>;
    }
}

const mapStateToProps = calendar => {
    const dayOrder = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    return {
        calendar: dayOrder.map(day => ({
            day,
            meals: Object.keys(calendar[day]).reduce((meals, meal) => {
                meals[meal] = calendar[day][meal] ? calendar[day][meal] : null;

                return meals;
            }, {}),
        })),
    };
};

const mapDipatchToProps = dispatch => {
    return {
        selectRecipe: data => dispatch(addRecipe(data)),
        remove: data => dispatch(removeFromCalendar(data)),
    };
};

export default connect(mapStateToProps, mapDipatchToProps)(App);
