import React, { useEffect, useState } from "react";
import baseURL from "../../ApiWork/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import ResponseUserTable from "./ResponseUserTable";
import moment from "moment-timezone";

export default function AdminDashBoard() {
  const [checkDate, setCheckDate] = useState([]);
  const [tabledata, setTabledata] = useState([]);
  const [teams, setTeams] = useState([]);

  const ApiList = async (myTeam) => {
    const newTeam = myTeam || "";
    try {
      const resp = await baseURL.get(`/fetch/user/team?team=${newTeam}`);
      if (resp.status === 200) {
        setTabledata(resp.data.data);
      }

      const ret = await baseURL.get("/openai/checked-date");

      const team = await baseURL.get("/team", {});
      setTeams(team.data.data);

      setCheckDate(moment(ret.data));
    } catch (error) {
      toast.error(" Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onTeamChange = async (e) => {
    const selectedTeam = e.target.value;
    const resp = await baseURL.get(
      `/fetch/user/team?team=${selectedTeam === "-1" ? "" : selectedTeam}`
    );
    if (resp.status === 200) {
      setTabledata(resp.data.data);
      console.log(resp.data.data);
    }
  };

  useEffect(() => {
    ApiList();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginTop: 10 }}>
          <div className="col-7">
            <h2>
              Last checked date:{" "}
              {checkDate.format &&
                checkDate.tz("America/New_York").format("YYYY/M/D hh:mm a")}
            </h2>
          </div>
          <div className="col-5">
            <select
              onChange={onTeamChange}
              className="form-control "
              style={{ width: "70%" }}
              name="selectedFruit"
            >
              <option value="-1">All Teams(Select You Team)</option>
              {teams &&
                teams.map((item) => (
                  <option value={item._id}>
                    {item.team_name} - {item.team_number}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {tabledata &&
          tabledata.map((item, index) =>
            item.username === "admin" ? null : (
              <ResponseUserTable
                key={index}
                userId={item._id}
                userName={item.username}
              />
            )
          )}
        <div style={{ padding: "0 50px" }}>
          <table style={{ marginTop: "5%" }} className="table table-bordered">
            <thead>
              <tr>
                <th>User Name</th>
                <th>TTA (Positive Reply)</th>
                <th>Reply Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {tabledata &&
                tabledata.map((item, index) => (
                  <>
                    {item.team === "admin" ? null : (
                      <tr key={index}>
                        <td>{item.username}</td>
                        <td>
                          {!item.tta_value
                            ? 0
                            : moment.utc(moment.duration(item.tta_value, 'hours').asMilliseconds()).format('D[d] H[h] m[m]')}
                        </td>
                        <td>{item.quality_score ? Number(item.quality_score).toFixed(2) : 0}</td>
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
