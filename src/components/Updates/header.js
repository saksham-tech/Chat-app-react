import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { X, Trash } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const Header = ({ showTrash = false, onClose }) => {
  const theme = useTheme();

  return (
    <Box
      p={4}
      sx={{
        height: 60,
        width: "100%",
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", height: "100%" }}
      >
        <Typography variant="h6">Saksham (Me)</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          {showTrash && (
            <IconButton>
              <Trash size={22} color="#e53935" />
            </IconButton>
          )}
          <IconButton onClick={onClose}>
            <X size={24} color="#1976d2" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
