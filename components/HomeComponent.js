import React from 'react'
import {ScrollView, Text} from 'react-native'
import {Card} from 'react-native-elements'
import {DISHES} from '../shared/dishes'
import {PROMOTIONS} from '../shared/promotions'
import {LEADERS} from '../shared/leaders'

function RenderItem({item}){
    if(item != null){
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation ? item.designation : null}
                image={require('./images/uthappizza.png')}
            >
            <Text style={{margin: 10}}>{item.description}</Text>
            </Card>
        )

    } else{
        return <View></View>
    }
}


export default class Home extends React.Component{
    
    state={
        dishes: DISHES,
        promotions: PROMOTIONS,
        leaders: LEADERS
    }

    static navigationOptions = {
        title: 'Home'
    }

    render(){
        return(
            <ScrollView>
                <RenderItem item={this.state.dishes.filter(dish => dish.featured)[0]} />
                <RenderItem item={this.state.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem item={this.state.leaders.filter(leader => leader.featured)[0]} />
            </ScrollView>
        )
    }

}