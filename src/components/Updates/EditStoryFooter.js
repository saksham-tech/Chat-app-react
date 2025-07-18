import React from 'react';
import { Box, Stack, IconButton } from '@mui/material';
import { Plus, X, PaperPlaneTilt } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

const EditStoryFooter = ({ stories, setStories }) => {
  const theme = useTheme();

  const boxSize = 72;
  const crossColor = "#1976d2";
  const crossWeight = "bold";

  const handleAdd = () => {
    const newId = Date.now();
    const newImg = `https://i.pravatar.cc/600?img=${Math.floor(Math.random() * 70 + 1)}`;
    setStories([...stories, { id: newId, img: newImg }]);
  };

  const handleRemove = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        px: 2,
        py: 2,
        backgroundColor: 'transparent',
        width: '100%',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Centered Group: Add + Thumbnails */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mx: 'auto', // Center horizontally in parent Stack
            gap: 2,
          }}
        >
          {/* Add Button */}
          <IconButton
            onClick={handleAdd}
            sx={{
              width: boxSize,
              height: boxSize,
              borderRadius: 1,
              border: "2px dashed #1976d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={28} color="#1976d2" />
          </IconButton>

          {/* Thumbnails */}
          <Stack direction="row" spacing={2}>
            {stories.map((story) => (
              <Box key={story.id} sx={{ position: "relative" }}>
                {/* X Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    zIndex: 1,
                  }}
                >
                  <IconButton size="small" onClick={() => handleRemove(story.id)}>
                    <X size={18} color={crossColor} weight={crossWeight} />
                  </IconButton>
                </Box>

                {/* Image Box */}
                <Box
                  sx={{
                    width: boxSize,
                    height: boxSize,
                    border: "2px solid #1976d2",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={story.img}
                    alt={`story-${story.id}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Right-aligned Send Icon */}
        <Box
          sx={{
            ml: 2,
            width: 40,
            height: 40,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <IconButton >
            <PaperPlaneTilt color="#fff" size={16} />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditStoryFooter;
