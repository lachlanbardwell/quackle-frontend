import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { UserPreview } from "../../components/user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { QuackInput } from "../../components/quack-input/quack-input";
import { apiUrl } from "../../helpers/api-url";
import { Badge, Loader, Text, Tooltip } from "@mantine/core";
import { IUserPreview } from "../../types/user-types";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "./trending-page.css";

export const TrendingPage: React.FC = () => {
  const { userData, initiateQuack, setInitiateQuack, loggedIn } =
    useContext(QuackleContext);
  const [trendingData, setTrendingData] = useState<IUserPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTrendingData = async () => {
    try {
      const data = await axios.get(`${apiUrl}/trending`);
      setTrendingData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <div className="trending-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          avatar={userData.avatar}
        />
      )}
      <ProfileUser
        loggedIn={loggedIn ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <section className="trending-list">
        <span className="quacking-current">
          <Text size="xl"> Currently Quacking</Text>
          <ShowChartIcon />
        </span>
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        {loading ? (
          <Loader color="cyan" sx={{ margin: "25vh auto auto auto" }} />
        ) : (
          trendingData.map((next) => {
            return (
              <span key={next._id} className="trending-stats">
                <UserPreview
                  name={next.name}
                  username={next.username}
                  avatar={next.avatar}
                  tagline={next.tagline}
                  matchesUser={next.username === userData.username}
                />
                <Tooltip
                  label={`${next.quacks} Quack${next.quacks === 1 ? "" : "s"}`}
                >
                  <Badge
                    size="lg"
                    radius="xl"
                    color="cyan"
                    style={{ margin: "auto", padding: "10px" }}
                  >
                    {next.quacks}🦆
                  </Badge>
                </Tooltip>
              </span>
            );
          })
        )}
      </section>
      <ProfileSideBar loggedIn={loggedIn ? true : false} />
    </div>
  );
};
