import React, { useContext, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button, Loader, Text, Textarea } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { UserPreview } from "../../components/user-preview/user-preview";
import { apiUrl } from "../../api/api-url";
import EditIcon from "@mui/icons-material/Edit";
import "./settings-page.css";

export const SettingsPage: React.FC = () => {
  const { userData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);
  const [editTag, setEditTag] = useState<boolean>(false);
  const [tagline, setTagline] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeTagline = async () => {
    if (editTag) {
      setLoading(true);
      await axios
        .patch(`${apiUrl}/user/${userData.username}`, { tagline: tagline })
        .then((res) => console.log(res))
        .catch((error) => console.error(error));
      setLoading(false);
      setEditTag(false);
      return;
    }
    setEditTag(true);
  };

  return (
    <div className="settings-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          displayPic={userData.displayPic}
          atUser={"everyone"}
        />
      )}
      <ProfileUser setInitiateQuack={setInitiateQuack} loggedIn={true} />
      <section className="settings-options">
        <h5>Quack Quack, {userData.name}!</h5>
        <span className="user-tagline">
          <Text size="md">Tagline:</Text>
          {!editTag && !userData.tagline && (
            <Text color="dimmed">Enter a tagline</Text>
          )}
          {editTag && (
            <Textarea
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              sx={{ flex: " 1 1 auto", margin: "0 2%" }}
            ></Textarea>
          )}
          {loading && <Loader />}
          {!editTag && !loading && <Text>{userData.tagline}</Text>}
          <Button
            variant="outline"
            color="dark"
            onClick={() => changeTagline()}
          >
            {editTag ? "Confirm" : <EditIcon />}
          </Button>
        </span>
      </section>
      <section className="settings-data">
        <UserPreview
          avatar={userData.displayPic}
          name={userData.name}
          username={userData.username}
          tagline={userData.tagline}
        />
        <br />
        <Text size="sm">
          Hatched on {userData.createdAt.toString().slice(0, 10)}
        </Text>
        <Text size="sm">{userData.email}</Text>
        <div className="settings-quacks">
          <Button>Blocked Users</Button>
        </div>
      </section>
    </div>
  );
};
