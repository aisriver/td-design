import React, { FC, ReactNode, useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { generate } from '@ant-design/colors';
import { createRestyleComponent, createVariant, useTheme, VariantProps } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Box from '../box';
import Text from '../text';

import { px } from '../helper';
import Icon from '../icon';

type TagProps = {
  /** 标签的大小 */
  size?: 'large' | 'small' | 'middle';
  /** 设置标签类型 */
  type?: 'ghost' | 'primary' | 'default';
  /** 设置禁用 */
  disabled?: boolean;
  /** 指定标签颜色 */
  color?: string;
  /** 可关闭 */
  closable?: boolean;
  /** 设置标签的选中状态 */
  checked?: boolean;
  /** 点击关闭的回调函数 */
  onClose?: () => void;
  /** 点击标签的回调函数 */
  onChange?: (selected: boolean) => void;
};

const Tag: FC<TagProps> = ({
  children,
  closable = false,
  disabled = false,
  checked = false,
  size = 'middle',
  type = 'default',
  color,
  onClose,
  onChange,
}) => {
  const theme = useTheme<Theme>();

  const [selected, setSelected] = useState(checked);
  const [closed, setClosed] = useState(false);

  type Props = VariantProps<Theme, 'tagVariants'> & { children: ReactNode };
  const BaseTag = createRestyleComponent<Props, Theme>([createVariant({ themeKey: 'tagVariants' })]);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled) {
      return;
    }
    setSelected(!selected);
    if (onChange) {
      onChange(!selected);
    }
  };

  /** 删除事件 */
  const handleDelete = () => {
    setClosed(!closed);
    if (onClose) {
      onClose();
    }
  };

  /** 字体和图标大小根据size计算 */
  const fontSizeMap = {
    large: px(14),
    middle: px(12),
    small: px(10),
  };

  const closeSizeMap = {
    large: px(16),
    middle: px(14),
    small: px(14),
  };

  const selectSizeMap = {
    large: px(30),
    middle: px(26),
  };

  /** 背景色和字体颜色计算 */
  const colors = color ? generate(color) : [];
  let bgColor = theme.colors.tagBgColor;
  let fontColor = theme.colors.tagTextColor;
  if (type === 'primary') {
    bgColor = theme.colors.secondaryColor;
    fontColor = theme.colors.primaryColor;
  }
  if (color) {
    bgColor = colors.length ? colors[0] : theme.colors.tagBgColor;
    fontColor = color || theme.colors.tagTextColor;
  }
  if (disabled) {
    bgColor = theme.colors.disabledBgColor;
    fontColor = theme.colors.closedBgColor;
  }

  /** 删除的图标组件 */
  const closableDom =
    closable && !disabled ? (
      <TouchableOpacity
        onPress={() => handleDelete()}
        style={{
          position: 'absolute',
          width: px(25),
          height: px(25),
          top: -px(8),
          right: -px(10),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            backgroundColor: theme.colors.closedTagColor,
            borderRadius: px(50),
          }}
        >
          <Icon name="close" color={theme.colors.white} size={closeSizeMap[size]} />
        </Box>
      </TouchableOpacity>
    ) : null;

  /** 选中的图标组件 */
  const checkedDom =
    selected && !disabled ? (
      <Box
        style={{
          position: 'absolute',
          bottom: -1,
          right: -1,
        }}
      >
        <Svg viewBox="0 0 1040 1024" width={selectSizeMap[size]} height={selectSizeMap[size]}>
          <Path
            d="M1023.83 474.655l-549.255 549.283h549.255V474.655zM783.16 979.732l-96.896-96.933 36.335-36.35 60.56 60.583L952.729 737.4l36.335 36.35L783.16 979.731z"
            fill={fontColor}
          />
        </Svg>
      </Box>
    ) : null;

  if (closed) {
    return null;
  }

  /** 判断是否是线框标签 */
  const wrapStyle = type === 'ghost' ? { borderWidth: 1, borderColor: fontColor } : { backgroundColor: bgColor };

  /** 小标签单独处理 */
  const checkedStyle = selected && !disabled ? { borderColor: fontColor } : {};
  const smallTagContent = (
    <Box>
      <TouchableWithoutFeedback onPress={() => handlePress()}>
        <Box style={[{ borderWidth: 1, borderColor: bgColor, borderRadius: px(10) }, wrapStyle, checkedStyle]}>
          <BaseTag variant={size}>
            <Text fontSize={fontSizeMap[size]} style={fontColor ? { color: fontColor } : {}}>
              {children}
            </Text>
          </BaseTag>
        </Box>
      </TouchableWithoutFeedback>
      {closableDom}
    </Box>
  );

  return (
    <Box
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        overflow: 'visible',
      }}
    >
      {size === 'small' ? (
        smallTagContent
      ) : (
        <Box>
          <TouchableWithoutFeedback onPress={() => handlePress()}>
            <Box style={[{ borderWidth: 1, borderColor: bgColor, borderRadius: px(3) }, wrapStyle]}>
              <BaseTag variant={size}>
                <Text fontSize={fontSizeMap[size]} style={fontColor ? { color: fontColor } : {}}>
                  {children}
                </Text>
              </BaseTag>
            </Box>
          </TouchableWithoutFeedback>
          {closableDom}
          {checkedDom}
        </Box>
      )}
    </Box>
  );
};

export default Tag;
