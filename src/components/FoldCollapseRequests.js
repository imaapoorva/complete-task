import React, { useState } from "react";

function FoldCollapseRequests({ spanList }) {
  const [isRequestsFold, setIsRequestsFold] = useState(false);
  return (
    <div>
      {spanList?.map((item, index) => {
        return (
          <>
            <div className="span-container" key={item?.span_id}>
              <div className="span-info">
                <h5>
                  {item.req_info.req_method}{" "}
                  <span>{item.req_info.req_path}</span>
                </h5>

                <p>
                  {item?.source} - {item?.destination}
                </p>
              </div>

              <div className="action-container">
                <div className="latency-chip">
                  <span>{Number(item.req_info.latency).toFixed(2)}ms</span>
                  {item.req_info?.error && <span className='saffron-dot'></span>}
                </div>

                {item.children && item.children?.length > 0 ? (
                  <button
                    onClick={() => {
                      setIsRequestsFold(!isRequestsFold);
                    }}
                  >
                    <span class="material-symbols-rounded">
                      {isRequestsFold ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {isRequestsFold ? null : (
              <>
                {item.children && item.children?.length > 0 && (
                  <div className="spacing" style={{ marginLeft: '0px' }}>
                    <FoldCollapseRequests spanList={item?.children} />
                  </div>
                )}
              </>
            )}
          </>
        );
      })}
    </div>
  );
}

export default FoldCollapseRequests;
