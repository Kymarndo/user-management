import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useParams } from "react-router-dom";

const CandidateSubmissions = () => {
  const { missionID } = useParams();
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    const getCandidates = async () => {
      const fullList = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        fullList.push({
          name: doc.data().firstname + " " + doc.data().lastname,
        });
        setCandidateList(fullList);
      });
    };
    getCandidates();
  }, []);

  return (
    <>
      <h2>Candidate Submissions</h2>
      <div style={{ display: "flex", gap: "1em" }}>
        {candidateList.map((candidateName, id) => {
          return (
            <Link
              to={`/submissions/mission/${missionID}/${candidateName.name}`}
              key={id}
            >
              {candidateName.name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CandidateSubmissions;
