import React from 'react'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Dishdetail from './DishDetailComponent'
import {View} from 'react-native'

export default class Main extends React.Component{ 
    state={
        dishes: DISHES,
        selectedDish: null
    }

    onDishSelect = dishId => {
        this.setState({selectedDish: dishId})
    }

     render(){
         return(
             <View>
                <Menu dishes={this.state.dishes}
                onPress={dishId => this.onDishSelect(dishId)}
                />
                <Dishdetail dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]}/>
            </View>
         )
     }
}