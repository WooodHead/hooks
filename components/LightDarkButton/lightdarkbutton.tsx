
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react';

const Lightdarkbutton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
      <ActionIcon
        onClick={() => toggleColorScheme()}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.orange[4] : theme.colors.pink[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <Sun width={20} height={20} />
        ) : (
          <MoonStars width={20} height={20} />
        )}
      </ActionIcon>
  );
}

export default Lightdarkbutton