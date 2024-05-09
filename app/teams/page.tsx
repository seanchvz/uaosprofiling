import { useGlobalState } from "@/app/context/globalProvider";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { plus } from "@/app/utils/Icons";
import TeamModal from "../Components/Modals/TeamModal";
import CreateTeam from "../Components/Modals/CreateTeam";
import TeamContent from "../TeamContent/TeamContent";

interface Props {
  name: string;
  teams: any[];
}

function Page({ name, teams }: Props) {
  const { theme, isLoading, openModal, modal, fetchTeams } = useGlobalState();
  const [modalState, setModalState] = useState("create");
  const [selectedTeam, setSelectedTeam] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleOpenCreateModal = () => {
    setModalState("create");
    setSelectedTeam(undefined);
    openModal();
  };

  const handleSearchChange = (team) => {
    setSearchTerm(team.target.value);
  };

  const filteredTeams = teams.filter((team) => {
    const matchesName = team.teamName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSport =
      selectedSport === "all" ||
      team.sport.toLowerCase() === selectedSport.toLowerCase();

    console.log(
      `Team: ${team.teamName}, Sport: ${team.sport}, matchesName: ${matchesName}, matchesSport: ${matchesSport}`
    );
    return matchesName && matchesSport;
  });

  return (
    <DashboardStyled theme={theme}>
      {modal && (
        <TeamModal>
          <CreateTeam submitState={modalState} team={selectedTeam} />
        </TeamModal>
      )}
      <div className="header">
        <h1>{name}</h1>
        <div className="controls">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            style={{
              height: "3rem",
              marginRight: "1rem",
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              color: "#eee",
              backgroundColor: "#323232",
              border: "1px solid #555",
              outline: "none",
            }}
          >
            <option value="all">All Sports</option>
            <optgroup label="Basketball">
              <option value="basketball men">Basketball Men</option>
              <option value="basketball women 3x3">
                Basketball Women (3X3)
              </option>
              <option value="basketball women 5x5">
                Basketball Women (5X5)
              </option>
            </optgroup>
            <optgroup label="Football">
              <option value="football men">Football Men</option>
              <option value="football women">Football Women</option>
            </optgroup>
            <optgroup label="Volleyball">
              <option value="volleyball men">Volleyball Men</option>
              <option value="volleyball women">Volleyball Women</option>
            </optgroup>
            <optgroup label="Badminton">
              <option value="badminton women">Badminton Women</option>
              <option value="badminton men">Badminton Men</option>
            </optgroup>
            <optgroup label="ESport">
              <option value="valorant">Valorant</option>
              <option value="dota">DoTA</option>
              <option value="mobile legends">Mobile Legends</option>
            </optgroup>
            <option value="table tennis">Table Tennis</option>
            <option value="taekwondo">Taekwondo</option>
            <option value="chess">Chess</option>
            <option value="swimming">Swimming Mixed</option>
            <option value="strength and conditioning">
              Strength and Conditioning
            </option>
            <option value="special projects">Special Projects Mixed</option>
            {/* Add options as needed */}
          </select>
          <input
            type="text"
            placeholder="Search Teams..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="create-item" onClick={handleOpenCreateModal}>
            {plus}
            Add New Team
          </button>
        </div>
      </div>

      <div className="inventory">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <TeamContent
              key={team.id}
              teamName={team.teamName}
              handleEdit={() => {
                setModalState("edit");
                setSelectedTeam(team);
                openModal();
              }}
              sport={team.sport}
              id={team.id}
            />
          ))
        ) : (
          <p>No teams found.</p>
        )}
      </div>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.main`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;

      border-radius: 0.5rem;
    }
  }

  .create-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 19.8rem;
    height: 3rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Page;
