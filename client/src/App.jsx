import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("world");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generate = async () => {
    const response = await axios.post("http://localhost:5000/generate", {
      prompt,
      type,
    });

    setDescription(response.data.description);
    setImageUrl(response.data.imageUrl);
  };

  return (
    <div className="App">
      <h1>Reality Architect</h1>
      <select onChange={(e) => setType(e.target.value)} value={type}>
        <option value="world">World</option>
        <option value="character">Character</option>
        <option value="artifact">Artifact</option>
      </select>
      <input
        type="text"
        placeholder="Describe your idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generate}>Generate</button>

      {description && (
        <div className="output">
          <h2>Description:</h2>
          <p>{description}</p>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default App;