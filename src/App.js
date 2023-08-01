import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayRequest from "./components/DisplayRequest";

function App() {
  const [spanList, setSpanList] = useState([]);

  /*  Grouping Unique trace_id and return array of array */
  function groupByTraceId(data) {
    const groups = {};

    data.forEach((item) => {
      const { trace_id, req_info } = item;

      if (!groups[trace_id]) {
        groups[trace_id] = [];
      }

      groups[trace_id].push(item);
    });

    /* Calculate error count and update the spans array */
    Object.values(groups).forEach((spans) => {
      const errorCount = spans.reduce((count, span) => {
        return count + (span.req_info?.error ? 1 : 0);
      }, 0);

      spans.errorCount = errorCount;
    });

    const result = Object.values(groups);
    return result;
  }

  const getSpanList = async () => {
    const response = await axios.get(
      " https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c"
    );

    const list = response.data?.spans;
    setSpanList(groupByTraceId(list));
    // console.log(groupByTraceId(list));
  };

  useEffect(() => {
    getSpanList();
    return () => { };
  }, []);

  return (
    <div className="container">
      {spanList.map((item, index) => {
        const errorCount = item.errorCount || 0;

        return item?.length > 0 ? (
          <div key={`space_group_${index}`} className="section-header">
            <h3 style={{}}>{item?.[0]?.trace_id}</h3>

            <div className="span-info-container">
              <div className="span-info-chip">
                <span>{item?.length} Spans</span>
              </div>
              <div className="span-info-chip error-chip">
                <span>{errorCount} Error</span>
              </div>
            </div>

            <DisplayRequest spans={item} />
          </div>
        ) : null;
      })}
    </div>
  );
}

export default App;
