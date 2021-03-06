import React from 'react';
import { Button } from 'react-native';
import { Modal } from '@td-design/react-native';

export default function ModalTipDemo() {
  const handlePress = () => {
    Modal.tip({
      img: require('../assets/images/island.jpg'),
      height: 400,
      title: '我是弹窗',
      content: '我是内容',
    });
  };
  return <Button title="弹窗" onPress={handlePress} />;
}
