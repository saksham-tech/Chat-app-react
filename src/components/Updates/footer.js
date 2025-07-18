import React from 'react'
import { Box, Stack, Badge, IconButton, TextField, InputAdornment,Fab,Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
    Camera,
    File,
    Image,
    Sticker,
    User,
} from "phosphor-react";
const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];

const ChatInput = ({ setOpenPicker }) => {
    const [openActions, setOpenActions] = React.useState(false);
    const theme = useTheme();
    return (
        <StyledInput
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack
                            sx={{
                                position: "relative",
                                display: openActions ? "inline-block" : "none",
                            }}
                        >
                            {Actions.map((el) => (
                                <Tooltip placement="right" title={el.title}>
                                    <Fab
                                        onClick={() => {
                      setOpenActions(!openActions);
                    }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment>
                            <IconButton onClick={() => {
                  setOpenActions((prev => !prev));
                }}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment: (
                    <InputAdornment>
                        <IconButton onClick={() => {
                            setOpenPicker((prev) => !prev);

                        }}>
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px"
    },


}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
const Footer = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = React.useState(false);
    return (
        <Box
            p={2}
            sx={{
                height: 80,
                width: "100%",
                backgroundColor:
                    theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
                boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                {/*ChatInput */}
                <Stack sx={{ width: "100%" }} >
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", right: 100, bottom: 81 }}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                    </Box>
                    <ChatInput setOpenPicker={setOpenPicker} />
                </Stack>

                <Box
                    sx={{
                        height: 48,
                        width: 48,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                    }}
                >
                    <Stack
                        sx={{
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <IconButton>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer