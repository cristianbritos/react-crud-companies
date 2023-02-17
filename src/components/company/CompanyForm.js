import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as CompanyServer from "./CompanyServer";

function CompanyForm() {
  const initialState = { id: 0, name: "", foundation: 1950, website: "" };
  const history = useHistory();
  const param = useParams();
  const [company, setCompany] = useState(initialState);

  const handelEventOnChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!param.id) {
        res = await CompanyServer.registerCompany(company);
        const data = await res.json();
        if (data.message === "Success") {
          setCompany(initialState);
        }
      } else {
        await CompanyServer.updateCompany(param.id, company);
      }
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async (companyId) => {
    try {
      let res = await CompanyServer.getCompany(companyId);
      let data = await res.json();
      console.log(data.company);
      const { name, foundation, website } = data.company;
      setCompany({
        name: name,
        foundation: foundation,
        website: website,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (param.id) {
      getCompany(param.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-3 mx-auto">
      <h2 className="mb-3 text-center">Company </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handelEventOnChange}
            className="form-control"
            minLength="2"
            maxLength="50"
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foundation:</label>
          <input
            type="number"
            name="foundation"
            value={company.foundation}
            onChange={handelEventOnChange}
            className="form-control"
            minLength="1900"
            maxLength="2030"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">WebSite:</label>
          <input
            type="url"
            name="website"
            value={company.website}
            onChange={handelEventOnChange}
            className="form-control"
            minLength="2"
            maxLength="100"
            required
          />
        </div>
        <div>
          {param.id ? (
            <button type="submit" className="btn btn-block btn-primary">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-block btn-success">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CompanyForm;
