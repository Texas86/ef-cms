import { connect } from '@cerebral/react';
import React from 'react';
import { state } from 'cerebral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CompletedMessages = connect(
  {
    documentDetailHelper: state.documentDetailHelper,
  },
  ({ documentDetailHelper }) => {
    return (
      <div>
        {(!documentDetailHelper.formattedDocument ||
          !documentDetailHelper.formattedDocument.completedWorkItems ||
          !documentDetailHelper.formattedDocument.completedWorkItems
            .length) && (
          <div>
            There are no completed messages associated with this document.
          </div>
        )}
        {documentDetailHelper.formattedDocument &&
          documentDetailHelper.formattedDocument.completedWorkItems &&
          documentDetailHelper.formattedDocument.completedWorkItems.map(
            (workItem, idx) => (
              <div
                className="card completed-card"
                aria-labelledby="tab-pending-messages"
                key={idx}
              >
                <div className="gray-header">
                  <div className="content-wrapper">
                    <div className="completed-icon">
                      <FontAwesomeIcon icon={['far', 'check-circle']} />
                    </div>
                    <div className="completed-content">
                      {workItem.completedBy && (
                        <React.Fragment>
                          <p>
                            <span className="label-inline">
                              Closed by {workItem.completedBy}
                            </span>
                          </p>
                          <p>
                            <span className="label-inline">
                              {workItem.completedAtFormatted}
                            </span>
                          </p>
                          {workItem.completedMessage && (
                            <p className="completed-message">
                              <span>{workItem.completedMessage}</span>
                            </p>
                          )}
                        </React.Fragment>
                      )}
                      {workItem.completedMessage === 'Served on IRS' && (
                        <p>
                          <span className="label-inline">
                            Served on IRS at {workItem.completedAtFormatted}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="content-wrapper">
                  {workItem.messages.map((message, messageIdx) => (
                    <React.Fragment key={messageIdx}>
                      <div>
                        <p>
                          <span className="label-inline">To</span>
                          {message.to}
                        </p>
                        <p>
                          <span className="label-inline">From</span>
                          {message.from}
                        </p>
                        <p>
                          <span className="label-inline">Received</span>
                          {message.createdAtTimeFormatted}
                        </p>
                        <p className="completed-message">{message.message}</p>
                      </div>
                      {messageIdx < workItem.messages.length - 1 && <hr />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ),
          )}
      </div>
    );
  },
);
