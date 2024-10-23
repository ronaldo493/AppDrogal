import React from "react";
import { View, Button, Text } from "react-native";
import MaquinaItem from "./MaquinaItem";

export default MaquinaSection = ({title, items, onAddItem}) => {
    return (
        <View>
            <Text>{title}</Text>
            {items.map((item, index) => (
                <MaquinaItem key={index} item={item} />
            ))}
            <Button title="Adicionar mais Item" onPress={onAddItem} />
        </View>
    )
}