import React, { FC } from 'react';
import Cascader from './Cascader';
import NormalPicker from './NormalPicker';
import { PickerProps, ModalPickerProps, CascadePickerItemProps } from './type';

const Picker: FC<PickerProps & ModalPickerProps> = ({ cascade = false, cols = 3, data, ...restProps }) => {
  if (cascade) {
    return <Cascader {...restProps} {...{ cols, data: data as CascadePickerItemProps[] }} />;
  }
  return <NormalPicker {...restProps} {...{ data }} />;
};

export default Picker;
