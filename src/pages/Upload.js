import { useParams } from "react-router-dom";
import MicrosoftSignOut from "../components/auth/MicrosoftSignOut";
import FileUpload from "../components/FileUpload/FileUpload";

import style from "../styles/Upload.module.css";

export const Upload = () => {
  const { id } = useParams();
  return (
    <div>
      <div className={style.container}>
        <div className={style.leftCol}>
          <h2>Mission {id} Submission</h2>
          <FileUpload missionNum={id} />
        </div>

        <div className={style.rightCol}></div>
      </div>
      <MicrosoftSignOut />
    </div>
  );
};
