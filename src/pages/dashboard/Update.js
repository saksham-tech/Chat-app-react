import React, { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    IconButton,
    Link,
    Divider,
    Avatar,
} from "@mui/material";
import { MagnifyingGlass, Plus, CaretLeft, CircleDashed } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { ChatList, UpdateList } from "../../data";

import UpdateElement from "../../components/UpdateElement";
import { useNavigate } from "react-router-dom";
const Update = ({ onAddStoryClick }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Stack direction="row" sx={{ width: "100%" }}>
            {/* Left */}

            <Box
                sx={{
                    overflowY: "scroll",
                    height: "100vh",
                    width: 320,
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    // Hide scrollbar
                    "&::-webkit-scrollbar": { display: "none" },
                    "-ms-overflow-style": "none", // IE and Edge
                    "scrollbar-width": "none", // Firefox
                }}
            >
                <Stack p={4}>
                    {/* Header */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                    >
                        {/* Left side: Caret + Title */}
                        <Box sx={{ display: "flex", alignItems: "center", ml: -3 }}>
                            <IconButton onClick={() => navigate("/app")}>
                                <CaretLeft size={24} color="#4B4B4B" />
                            </IconButton>
                            <Typography variant="h5">Updates</Typography>
                        </Box>

                        {/* Right side: Plus icon */}
                        <IconButton onClick={onAddStoryClick}>
                            <Plus size={24} color="#4B4B4B" />
                        </IconButton>

                    </Stack>
                </Stack>



                <Stack spacing={2} px={2}>
                    <Typography variant="subtitle2" sx={{ color: "#676667" }}>Not seen</Typography>
                    {UpdateList.filter((item) => !item.seen).map((item) => (
                        <UpdateElement key={item.id} {...item} />
                    ))}


                    <Typography variant="subtitle2" sx={{ color: "#676667" }}>Seen</Typography>
                    {UpdateList.filter((item) => item.seen).map((item) => (
                        <UpdateElement key={item.id} {...item} />
                    ))}
                </Stack>






            </Box>

            {/* Right */}
        </Stack>
    )
}

export default Update