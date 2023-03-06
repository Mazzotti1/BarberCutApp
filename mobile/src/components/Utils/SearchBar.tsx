// import React, { useState } from 'react';
// import { View, Text, TextInput } from 'react-native';

// import { MagnifyingGlass } from 'phosphor-react-native';

// const data = [
//   'Item 1',
//   'Item 2',
//   'Item 3',
//   'Outro item',
//   'Mais um item',
// ];

// export function SearchBar() {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState<string[]>([]);

//   function handleSearchTextChange(text: string) {
//     setSearchText(text);

//     // Filtra os resultados com base no texto da pesquisa
//     const filteredResults = data.filter((item) =>
//       item.toLowerCase().includes(text.toLowerCase())
//     );
//     setSearchResults(filteredResults);
//   }

//   return (
//     <View>
//       <View
//         className="w-52 flex-row rounded-2xl h-9  items-center p-1 m-5"
//         style={{ backgroundColor: '#D9D9D9' }}
//       >
//         <MagnifyingGlass
//           size={20}
//           color="#0a0a0a"
//           weight="thin"
//           style={{ marginLeft: 16 }}
//         />
//         <TextInput
//           className="text-zinc-500 m-1 font-regular ml-4"
//           placeholder="Encontre um serviço"
//           value={searchText}
//           onChangeText={handleSearchTextChange}
//         />
//       </View>

//       {/* Renderiza os resultados da pesquisa */}
//       {searchResults.map((result) => (
//         <Text key={result}>{result}</Text>
//       ))}
//     </View>
//   );
// }
