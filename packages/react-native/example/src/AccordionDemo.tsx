import React from 'react';
import { Accordion, WingBlank } from '@td-design/react-native';

export default function AccordionDemo() {
  return (
    <WingBlank>
      <Accordion
        sections={[
          { title: 'title1', content: '我是内容我是内容我是内容我是内容我是内容我是内容我是内容' },
          {
            title: 'title2',
            content:
              '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
          },
          {
            title: 'title3',
            content:
              '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容',
          },
        ]}
      />
    </WingBlank>
  );
}
