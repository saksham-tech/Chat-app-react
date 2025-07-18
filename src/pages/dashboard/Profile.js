import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../../redux/slices/conversation";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.conversation.user_profile) || {
    name: "",
    about: "",
    img: "",
  };

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setName(user.name || "");
    setAbout(user.about || "");
    setImage(user.img || "");
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlh77dzqj/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;
      console.log("Uploaded image URL:", imageUrl);
      setImage(imageUrl);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Name cannot be empty");

    try {
      const res = await axios.patch(
        "http://localhost:3000/user/update-me", // ✅ Correct backend route
        {
          name,       // ✅ Backend expects "name"
          about,
          img: image, // ✅ Backend expects "img"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ Update Redux state
      dispatch(
        updateProfile({
          name: res.data.data.firstName,
          about: res.data.data.about,
          img: res.data.data.avatar,
        })
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <Stack spacing={3}>
      <Stack alignItems="center" spacing={1.5}>
        <Avatar src={image} sx={{ width: 80, height: 80 }} alt="profile-pic" />
        <Button component="label" variant="outlined" disabled={uploading}>
          Upload Profile Picture
          <input hidden accept="image/*" type="file" onChange={handleImageChange} />
        </Button>
      </Stack>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <TextField
        label="About"
        value={about}
        multiline
        rows={2}
        onChange={(e) => setAbout(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={uploading}
      >
        {uploading ? "Saving..." : "Save Changes"}
      </Button>
    </Stack>
  );
};

export default ProfileForm;
