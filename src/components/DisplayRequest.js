import React, { useEffect, useState } from "react";
import FoldCollapseRequests from "./FoldCollapseRequests";

function DisplayRequest({ spans }) {
  const [spanStructure, setSpanStructure] = useState([]);


  const getFolderStructure = (data, parentId = null) => {
    const folders = data.filter(item => item.parent_span_id === parentId);

    return folders.map(folder => ({
      ...folder,
      children: getFolderStructure(data, folder.span_id)
    }));
  };

  useEffect(() => {
    if (spans.length > 0) {
      const dataList = getFolderStructure(spans);
      console.log("dataList:", dataList);
      setSpanStructure(dataList)
    }

    return () => { };
  }, [spans]);


  return (
    <div>
      <FoldCollapseRequests spanList={spanStructure} />
    </div>
  );
}

export default DisplayRequest;
