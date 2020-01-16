import React from 'react'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'

export default class Main extends React.Component{ 
    state={
        dishes: DISHES
    }
     render(){
         return(
             <Menu dishes={this.state.dishes}/>
         )
     }
}