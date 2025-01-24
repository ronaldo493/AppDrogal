import React, { useState, useCallback } from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, Divider } from 'react-native-paper';
import { useAuthContext }from '../context/AuthContext'

interface HeaderMenuProps {
  navigation: any; //Navegação do React Navigation
  themeStyles: {
    textMenu: {
      color: string;
      paddingVertical: number;
      paddingHorizontal: number;
      fontSize: number;
    };
  }
}

const HeaderMenu: React.FC<HeaderMenuProps> = React.memo(({ navigation, themeStyles }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);

  const { clearToken } = useAuthContext();

  const handleLogout = () => {
    clearToken();
  };


  // Função para abrir o menu (usando useCallback para memoização)
  const openMenu = useCallback((event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;
    setAnchorPosition({ x: pageX, y: pageY });
    setIsMenuVisible(true);
  }, []);

  // Função para fechar o menu
  const closeMenu = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={openMenu} style={{ marginRight: 10, padding: 9 }}>
        <Icon name="account-circle" size={28} color={themeStyles.textMenu.color} />
      </TouchableOpacity>
      <Menu
        visible={isMenuVisible}
        onDismiss={closeMenu}
        anchor={{ x: anchorPosition?.x || 0, y: anchorPosition?.y || 0 }}
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('Settings');
          }}
          title="Configurações"
          titleStyle={themeStyles.textMenu}
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('EditProfile');
          }}
          title="Meu Perfil"
          titleStyle={themeStyles.textMenu}
        />
        <Divider />
        <Menu.Item
          onPress={handleLogout}
          title="Sair"
          titleStyle={themeStyles.textMenu}
        />
      </Menu>
    </>
  );
});

export default HeaderMenu;
