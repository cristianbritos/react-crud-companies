import { useEffect } from "react";
import { useState } from "react";
import * as CompanyServer from "./CompanyServer";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  const listCompanies = async () => {
    try {
      const res = await CompanyServer.listCompanies();
      const data = await res.json()      
      setCompanies(data.companies)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listCompanies();
  },[]);
  return (
    <div>
      {companies.map((company) => (
        <h1>{company.name}</h1>
      ))}
    </div>
  );
}

export default CompanyList;
