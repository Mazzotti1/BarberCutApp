

import React, { useState } from 'react';
import {View, Text, FlatList } from 'react-native'
import { SearchBar } from 'react-native-screens';



type Item = {
    id: string;
    name: string;
  };

  type ServicesListProps = {
    items: Item[];
  };




export function ServiceFilter({ items }: ServicesListProps) {
  const [filteredItems, setFilteredItems] = useState(items);

  function handleFilterChange(searchText: string) {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  }

  return (
    <View>
      <SearchBar />
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}