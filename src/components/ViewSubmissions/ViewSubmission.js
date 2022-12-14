import React from "react";
import { useState } from "react";
import { storage } from "../../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ViewSubmission = ({ candidateName, missionNum }) => {
  const [fileList, setFileList] = useState([]);

  const displayFiles = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(candidateName);
        const listRef = ref(storage, `mission${missionNum}/${candidateName}/`);
        listAll(listRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setFileList((prev) => [...prev, url]);
            });
          });
        });
      } else {
        alert("Please sign-in");
      }
    });
  };
  return (
    <div>
      <button onClick={displayFiles}>Show Files</button>
      {fileList.map((url, id) => {
        return (
          <iframe
            src={url}
            key={id}
            title="submission"
            style={{
              width: "100%",
              height: "580px",
              border: "none",
            }}
          />
        );
      })}
    </div>
  );
};

export default ViewSubmission;
