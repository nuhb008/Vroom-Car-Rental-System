import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/images";

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [regNo, setRegNo] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [editImage, setEditImage] = useState({ name: "", type: "", regNo: "" });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(API_URL);
      setImages(response.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleUpload = async () => {
    if (!file || !regNo) return alert("Please select a file and enter regNo");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/upload/${regNo}`, formData);
      alert("Upload successful");
      setFile(null);
      setRegNo("");
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Deleted");
      fetchImages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (image) => {
    setSelectedId(image.id);
    setEditImage({ name: image.name, type: image.type, regNo: image.regNo });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${selectedId}`, editImage);
      alert("Updated");
      setSelectedId(null);
      setEditImage({ name: "", type: "", regNo: "" });
      fetchImages();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Image Manager</h2>

      {/* Upload Section */}
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="Registration Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <hr />

      {/* Edit Section */}
      {selectedId && (
        <div>
          <h3>Update Image ID: {selectedId}</h3>
          <input
            type="text"
            value={editImage.name}
            onChange={(e) => setEditImage({ ...editImage, name: e.target.value })}
            placeholder="Image Name"
          />
          <input
            type="text"
            value={editImage.type}
            onChange={(e) => setEditImage({ ...editImage, type: e.target.value })}
            placeholder="Image Type"
          />
          <input
            type="text"
            value={editImage.regNo}
            onChange={(e) => setEditImage({ ...editImage, regNo: e.target.value })}
            placeholder="RegNo"
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <hr />

      {/* Image List */}
      <div>
        <h3>Uploaded Images</h3>
        {images.length === 0 ? (
          <p>No images found</p>
        ) : (
          <ul>
            {images.map((img) => (
              <li key={img.id}>
                <img src={`${API_URL}/view/${img.id}`} alt={img.name} width="100" />
                <strong>{img.name}</strong> (Type: {img.type}, RegNo: {img.regNo})
                <button onClick={() => handleEdit(img)}>Edit</button>
                <button onClick={() => handleDelete(img.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImageManager;
