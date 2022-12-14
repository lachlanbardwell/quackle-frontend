import React, { useContext, useEffect, useState } from "react";
import { IQuackOutput } from "../../types/quacks";
import { Avatar, Button, Text, Tooltip } from "@mantine/core";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { useImage } from "../../helpers/use-image";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import DeleteIcon from "@mui/icons-material/Delete";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  const { likeQuack } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<string>("");
  const avatarSrc = useImage(props.avatar);

  const calclikeList = (likes: string[]) => {
    switch (likes.length) {
      case 0: {
        setLikeList("Be the first to like this quack!");
        break;
      }
      case 1: {
        setLikeList(`Liked by ${likes}`);
        break;
      }
      case 2: {
        setLikeList(`Liked by ${likes[0]} and ${likes[1]}`);
        break;
      }
      default: {
        setLikeList(
          `Liked by ${likes[0]}, ${likes[1]} and ${likes.length - 2} other${
            likes.length - 2 > 1 ? "s" : ""
          }`,
        );
      }
    }
  };

  useEffect(() => {
    calclikeList(props.likes);
  }, [props.likes]);

  return (
    <section className="quack-output">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you really want to delete this quack?"
        confirmFunc={() => props.deleteQuack?.(props.id)}
      />
      <span className="quack-output-avatar">
        <Avatar src={avatarSrc} alt="user avatar" radius="xl" size="lg" />
      </span>
      <div className="quack-content">
        <span className="quack-user">
          <Text size="md" weight="bold">
            {props.name}&nbsp;
          </Text>
          <Text size="md" color="dimmed">
            @{props.username}&nbsp;
          </Text>
          <Text size="md" color="dimmed">
            {props.quackedAt.slice(0, 10)}
          </Text>
          {props.deleteQuack && (
            <Tooltip label="Delete Quack">
              <Button
                color="dark"
                variant="subtle"
                size="xs"
                sx={{ marginLeft: "auto" }}
                onClick={() => setModal(true)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </Tooltip>
          )}
        </span>
        <span className="quack-message">
          <Text
            size="sm"
            style={{
              textAlign: "initial",
              paddingBottom: "5px",
            }}
          >
            {props.content}
          </Text>
          {props.atUser !== "everyone" && (
            <Link
              to={`/profile/${props.atUser}`}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                textAlign: "initial",
              }}
            >{`@${props.atUser}`}</Link>
          )}
        </span>
        <span className="quack-options">
          <Button
            size="sm"
            color="dark"
            variant="outline"
            disabled={!props.loggedIn}
          >{`???? Reply ${props.replies.length}`}</Button>
          <Button
            size="sm"
            color="dark"
            variant="outline"
            onClick={() => likeQuack(props.username, props.id, false)}
          >{`???? Re-quacks ${props.requacks}`}</Button>
          <Tooltip label={likeList}>
            <Button
              size="sm"
              color="dark"
              variant="outline"
              onClick={() => likeQuack(props.username, props.id, true)}
            >{`??? Likes ${props.likes.length}`}</Button>
          </Tooltip>
        </span>
      </div>
      <hr />
    </section>
  );
};
