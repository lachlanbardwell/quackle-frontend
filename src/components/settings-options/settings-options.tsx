import React, { useContext, useState } from "react";
import { QuackleContext } from "../../context/user-context";
import { Accordion, Button, Image, Text, Textarea } from "@mantine/core";
import { ISettings, ISettingsOptions } from "../../types/settings";
import { ImageDrop } from "../image-drop/image-drop";
import { FileWithPath } from "@mantine/dropzone";
import EditIcon from "@mui/icons-material/Edit";
import "./settings-options.css";

export const SettingsOptions: React.FC<ISettingsOptions> = (props) => {
  const { userData } = useContext(QuackleContext);
  const imageSource = (option: keyof ISettings) => {
    return option === "avatar" || option === "banner" ? userData[option] : "";
  };
  const [imagePreview, setImagePreview] = useState("");

  const imageSrc = imageSource(props.option);

  const calcError = (option: string) => {
    if (option === "name" && props.settingsError.nameLength) {
      return "Maximum name length is 30 characters";
    }
    if (option === "name" && props.settingsError.nameProfanity) {
      return "Real ducks dont use such words";
    }
    if (option === "tagline" && props.settingsError.taglineLength) {
      return "Tagline must be less than 65 characters";
    }
    if (option === "tagline" && props.settingsError.taglineProfanity) {
      return "Real ducks dont use such words";
    }
    if (option === "location" && props.settingsError.locationLength) {
      return "Location must be 30 characters or less";
    }
    if (option === "location" && props.settingsError.locationProfanity) {
      return "Real ducks dont use such words";
    }
  };

  const handleDrop = (file: FileWithPath[]) => {
    setImagePreview(URL.createObjectURL(file[0]));
    const formData = new FormData();
    formData.append("image", file[0]);
    formData.append("option", props.option);

    props.setSetting((prev) => {
      return { ...prev, [props.option]: formData };
    });
    props.setEditOption((prev) => {
      return { ...prev, [props.option]: true };
    });
  };

  const imageData = (option: keyof ISettings) =>
    option === "avatar" || option === "banner";

  if (imageData(props.option)) {
    return (
      <Accordion>
        <Accordion.Item value={props.option}>
          <Accordion.Control
            sx={{
              lineHeight: 1.3,
              textTransform: "capitalize",
              fontWeight: "bolder",
            }}
          >
            {props.option}
          </Accordion.Control>
          <Accordion.Panel>
            <span className="user-settings">
              {!props.editOption[props.option] &&
                !userData[props.option] &&
                !imagePreview && (
                  <ImageDrop
                    imagePreview={imagePreview}
                    handleDrop={handleDrop}
                    imageType={props.option}
                    setEditOption={props.setEditOption}
                    changeSetting={props.changeSetting}
                    setSetting={props.setSetting}
                  />
                )}

              {props.editOption[props.option] && (
                <ImageDrop
                  imagePreview={imagePreview}
                  handleDrop={handleDrop}
                  imageType={props.option}
                  setEditOption={props.setEditOption}
                  changeSetting={props.changeSetting}
                  setSetting={props.setSetting}
                />
              )}

              {!props.editOption[props.option] && userData[props.option] && (
                <Image
                  src={imageSrc}
                  style={{
                    maxWidth: "100%",
                    width: props.option === "avatar" ? 150 : 400,
                  }}
                  height={150}
                  radius={props.option === "avatar" ? 100 : 0}
                />
              )}

              {(props.editOption[props.option] || userData[props.option]) && (
                <Button
                  variant="subtle"
                  color="dark"
                  onClick={() => props.changeSetting(props.option)}
                >
                  {props.editOption[props.option] ? "Confirm" : <EditIcon />}
                </Button>
              )}
            </span>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  } else {
    return (
      <Accordion>
        <Accordion.Item value={props.option}>
          <Accordion.Control
            sx={{
              lineHeight: 1.3,
              textTransform: "capitalize",
              fontWeight: "bolder",
            }}
          >
            {props.option}
          </Accordion.Control>
          <Accordion.Panel>
            <span className="user-settings">
              {!props.editOption[props.option] && !userData[props.option] && (
                <Text color="dimmed" size="sm">
                  Enter your {props.option}
                </Text>
              )}

              {props.editOption[props.option] && (
                <Textarea
                  value={props.setting[props.option] as string}
                  onChange={(e) =>
                    props.setSetting((prev) => {
                      return { ...prev, [props.option]: e.target.value };
                    })
                  }
                  sx={{ flex: "1 1 auto", margin: "0 2%" }}
                  error={calcError(props.option)}
                />
              )}
              {!props.editOption[props.option] && (
                <Text size="sm" color="dimmed">
                  {userData[props.option] as string}
                </Text>
              )}

              {
                <Button
                  variant="subtle"
                  color="dark"
                  onClick={() => props.changeSetting(props.option)}
                >
                  {props.editOption[props.option] ? "Confirm" : <EditIcon />}
                </Button>
              }
            </span>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
};
