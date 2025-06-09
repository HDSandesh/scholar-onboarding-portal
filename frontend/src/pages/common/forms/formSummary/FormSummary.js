import React, { useContext, useEffect, useState } from "react";
import MessageContext from "../../../../contexts/MessageContext";
import { ColumnChart, DonutChart, PieChart } from "@ui5/webcomponents-react-charts";
import axios from "../../../../api/axios";
import "./FormSummary.css";
import {
  List,
  ListItemStandard,
  Option,
  Panel,
  Title,
} from "@ui5/webcomponents-react";
const FormSummary = ({ formId }) => {
  const showAlert = useContext(MessageContext);
  const [summary, setSummary] = useState([]);
  const getSummary = async () => {
    try {
      const response = await axios.get(`/forms/${formId}/summary`);
      setSummary(response.data);
      // Reset form or redirect as needed
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response?.data || error.message
      );
      showAlert("Failed to get summary. Please try again.", "Negative");
    }
  };

  const sortDate = (answers) => {
    return answers.slice().sort((a, b) => {
      const dateA = new Date(a.answer);
      const dateB = new Date(b.answer);
      return dateA - dateB;
    });
  }

  useEffect(() => {
    getSummary();
  }, []);
  return (
    <div>
      {Object.keys(summary).map((questionId) => (
        <Panel
        key={questionId}
          header={<Title level="H3">{summary[questionId]?.questionText}</Title>}
        >
          {summary[questionId]?.type === "mcq" && (
            <PieChart
              dataset={summary[questionId]?.answers}
              dimension={{
                accessor: "answer",
              }}
              measure={{
                accessor: "count",
              }}
            />
          )}
          {(summary[questionId]?.type === "paragraph" || summary[questionId]?.type === "short-answer" || summary[questionId]?.type === "time") && (
            <List separators="All">
              <div className="scrollable-answers">
                {summary[questionId]?.answers.map((answer) => (
                  <ListItemStandard
                    wrappingType="Normal"
                    style={{ backgroundColor: "#f5f6f7" }}
                    text={answer.answer}
                  />
                ))}
              </div>
            </List>
          )}
          {summary[questionId]?.type === "date" && (
            <ColumnChart
            dataset={sortDate(summary[questionId]?.answers)}
            dimensions={[
              {
                accessor: 'answer'
              }
            ]}
            measures={[
              {
                accessor: 'count',
                label: 'Count'
              }
            ]}
          />
          )}
          {(summary[questionId]?.type === "scale" || summary[questionId]?.type === "checkbox") && (
            <ColumnChart
            dataset={summary[questionId]?.answers}
            dimensions={[
              {
                accessor: 'answer'
              }
            ]}
            measures={[
              {
                accessor: 'count',
                label: 'Count'
              }
            ]}
          />
          )}
          {(summary[questionId]?.type === "dropdown") && (
            <DonutChart
            dataset={summary[questionId]?.answers}
            dimension={{
              accessor: 'answer'
            }}
            measure={{
              accessor: 'count'
            }}
          />
          )}
        </Panel>
      ))}
    </div>
  );
};

export default FormSummary;
