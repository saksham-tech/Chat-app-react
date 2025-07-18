// components/UpdateElement.jsx
import React from 'react';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CircleDashed, Circle } from 'phosphor-react';

const UpdateElement = ({ img, name, time, seen }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor:
                    theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
            }}
            p={2}
        >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                {/* Left side: Avatar + Name */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                        sx={{
                            position: "relative",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {!seen && (
                            <CircleDashed
                                size={61}
                                color="#76D45E"
                                weight="thin"
                                style={{
                                    position: "absolute",
                                    top: "-6px",   // ← adjust this as needed
                                    left: "-6.3px",  // ← adjust this as needed
                                    zIndex: 1,
                                }}
                            />
                        )}
                        {seen && (
                            <Circle
                                size={61}
                                color="#76D45E"
                                weight="thin"
                                style={{
                                    position: "absolute",
                                    top: "-6.1px",   // ← adjust this as needed
                                    left: "-6.3px",  // ← adjust this as needed
                                    zIndex: 1,
                                }}
                            />
                        )}
                        <Avatar
                            src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                            sx={{ width: 40, height: 40, zIndex: 2 }}
                        />
                    </Box>
                    <Typography variant="subtitle2">{name}</Typography>
                </Stack>

                {/* Right side: Time */}
                <Typography variant="caption">{time}</Typography>
            </Stack>
        </Box>



    );
};

export default UpdateElement;
