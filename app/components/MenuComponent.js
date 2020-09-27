import React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const MenuComponent = () => {
    const [visible, setVisible] = React.useState(false);
  
    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);

    console.log('MenuComponent called')
  
    return (
      <Provider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom:50
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Media</Button>}>
            <Menu.Item onPress={() => {}} title="View" />
            <Menu.Item onPress={() => {}} title="Upload" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Dummy" />
          </Menu>
        </View>
      </Provider>
    );
  }
  
  export default MenuComponent;