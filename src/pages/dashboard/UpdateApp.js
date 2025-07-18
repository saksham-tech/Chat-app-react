import React, { useState } from 'react';
import Update from './Update';
import { Stack, Box, IconButton } from '@mui/material';
import Header from '../../components/Updates/header';
import Footer from '../../components/Updates/footer';
import EditStoryFooter from '../../components/Updates/EditStoryFooter';
import { useTheme } from '@mui/material/styles';
import { CaretLeft, CaretRight } from 'phosphor-react';

const UpdateApp = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(false);

  // ✅ Declare stories state here
  const [stories, setStories] = useState([
    { id: 1, img: 'https://i.pravatar.cc/600?img=11' },
    { id: 2, img: 'https://i.pravatar.cc/600?img=22' },
    { id: 3, img: 'https://i.pravatar.cc/600?img=33' },
  ]);

  const nextStory = () => {
    if (currentIndex < stories.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevStory = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Stack direction="row" sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box sx={{ width: 320, height: '100%', overflowY: 'auto' }}>
        <Update onAddStoryClick={() => setShowEditor(true)} />
      </Box>

      {/* Main Content */}
      <Stack
        sx={{
          flexGrow: 1,
          height: '100%',
          backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.paper,
        }}
      >
        {/* Header */}
        <Box sx={{ flexShrink: 0 }}>
          <Header showTrash={showEditor} onClose={() => setShowEditor(false)} />
        </Box>

        <Box sx={{ height: 16 }} />

        {/* Story Display */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 5,
              maxHeight: '100%',
            }}
          >
            <IconButton onClick={prevStory} disabled={currentIndex === 0}>
              <CaretLeft size={35} />
            </IconButton>

            <Box
              sx={{
                flexGrow: 1,
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Box sx={{ position: 'relative', width: 300, height: 500 }}>
                <Stack
                  direction="row"
                  spacing={0.5}
                  p={2}
                  sx={{
                    height: '100%',
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    right: 8,
                    zIndex: 2,
                  }}
                >
                  {stories.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        height: 6,
                        borderRadius: 1,
                        backgroundColor: index === currentIndex ? '#1976d2' : '#ffffff55',
                        transition: 'background-color 0.3s',
                      }}
                    />
                  ))}
                </Stack>

                <Box
                  component="img"
                  src={stories[currentIndex].img}
                  alt={`Story ${currentIndex + 1}`}
                  sx={{
                    width: '100%',
                    height: '99%',
                    borderRadius: 3,
                    objectFit: 'cover',
                    boxShadow: 3,
                  }}
                />
              </Box>
            </Box>

            <IconButton onClick={nextStory} disabled={currentIndex === stories.length - 1}>
              <CaretRight size={35} />
            </IconButton>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ flexShrink: 0 }}>
          {showEditor ? (
            <EditStoryFooter
              stories={stories}
              setStories={setStories}
              onClose={() => setShowEditor(false)}
            />
          ) : (
            <Footer />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default UpdateApp;
