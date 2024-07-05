import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";
import NavbarDark from "../components/navbarDark";
import { Link } from "react-router-dom";
import api from "../api/http";

const fetchAppliedCVs = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://localhost:8080/jobSeeker/get-cvs", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};

const CVList = () => {
  const queryClient = useQueryClient();

  const deleteCVMutation = useMutation({
    mutationFn: (eid) => {
      const token = localStorage.getItem("token");
      return api.delete(`/jobSeeker/delete-cv/${eid}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appliedCVs");
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["appliedCVs"],
    queryFn: fetchAppliedCVs,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <NavbarDark navClass="defaultscroll sticky" navLight={true} />
      <section className="section">
        <div className="container">
          <h2 className="my-4">CV Applied List</h2>
          <div className="list-group">
            {data.map((cv) => (
              <div
                key={cv.cvId}
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="row align-items-center">
                  <div className="col-md-1">
                    <img
                      src={cv.enterprise.avatar_url}
                      className="avatar avatar-small rounded shadow bg-white"
                      alt=""
                    />
                  </div>
                  <div className="col-md-11">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{cv.full_name}</h5>
                      <div>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() =>
                            deleteCVMutation.mutate(cv.enterprise.eid)
                          }
                        >
                          Delete
                        </button>
                        <Link
                          to={`/reapply-job`}
                          className="btn btn-primary btn-sm"
                        >
                          Update
                        </Link>
                      </div>
                    </div>
                    <small>Job: {cv.job}</small>
                    <div className="d-flex w-100 justify-content-between mt-2">
                      <small>{cv.jobType}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CVList;
