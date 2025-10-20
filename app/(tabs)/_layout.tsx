import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // symbol macro things
  const house = "house.fill";
  const search = "magnifyingglass";
  const addPost = "document.badge.plus";
  const heart = "heart.text.clipboard";
  const heartFilled = "heart.text.clipboard.fill";
  const profile = "person.crop.square.on.square.angled";
  const profileFilled = "person.crop.square.on.square.angled.fill";


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={house} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={search} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name={addPost} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? heartFilled : heart} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, focused }) => <IconSymbol size={28} name={focused ? profile : profileFilled} color={color} />,
        }}
      />
    </Tabs>
  );
}
