import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FeedScreen } from "./src/screens/feed";
import { TopicsScreen } from "./src/screens/topics";
import { DiscussionScreen } from "./src/screens/discussion";

const Stack = createNativeStackNavigator();

const App = () => {  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FeedScreen}/>
        <Stack.Screen name="Topics" component={TopicsScreen} />
        <Stack.Screen name="Discussion" component={DiscussionScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;