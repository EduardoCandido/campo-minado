import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import params from '../params';
import Mine from './Mine';
import Flag from './Flag';


//Por padrao o componente Field retorna um componente representando um campo de mina fechado
export default props => {

    const { mined, nearMines, opened, exploded, flagged } = props;

    const styleField = [styles.field];

    if(opened) styleField.push(styles.opened);
    if(exploded) styleField.push(styles.exploded);
    if(flagged) styleField.push(styles.flagged);
    if(!opened && !exploded ) styleField.push(styles.regular);

    let color = null;
    if(nearMines > 0){
        
        if(nearMines == 1) color = '#2A28D7';
        if(nearMines == 2) color = '#2B520F';
        if(nearMines > 2 && nearMines < 6) color = '#F9060A';
        if(nearMines > 6) color = '#F221A9';

    }

    return(
        <View style={styleField}>

            {/* Exibir o campo aberto com ou sem numero*/}
            {!mined && opened && nearMines > 0 ? 
            <Text style={[styles.label, {color: color}]}>
                {nearMines}
            </Text>: false }
            
            {/* Quando o campo tem mina e é aberto */}
            {mined && opened ? <Mine/> : false } 

            {/* Quando quer colocar uma bandeira sinalizando que tem mina */}
            {flagged && !opened ? <Flag/> : false }
        </View>
    )
}

styles = StyleSheet.create({
    field:{
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize,
    },
    regular:{
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333',
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center' ,
    },
    exploded: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    }
})