import React from 'react';
import { Text } from 'react-native';
import { typography } from '../styles/typography';

export default function AppText({ variant = 'body', style, children, ...props }) {
  return (
    <Text style={[typography[variant], style]} {...props}>
      {children}
    </Text>
  );
}