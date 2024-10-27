import { Toolbar } from "@/components/Toolbar";
import { AlignStartHorizontal, CheckCheck, Copy, Filter, Grid, Grid3x3, LayoutDashboard, LayoutGrid, Move, Settings, Settings2, Share2, Trash2, Wand2, X } from "@tamagui/lucide-icons";
import { Slot, Stack } from "expo-router";
import { ReactNode, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, useTheme, XStack, YStack, getTokens, Button, ScrollView, SizableText } from "tamagui";

export default function AlbumsLayout() {
  return (
    // <Slot />
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' }
    }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='[albumId]' />
      {/* <Stack.Screen name=''/> */}
    </Stack>
  );
}