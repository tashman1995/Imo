import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Alert.scss";

const Alert = ({ alerts, param }) => {
  // Removing Doubles of the same alert
  const uniqueAlerts = Array.from(new Set(alerts.map((a) => a.msg))).map(
    (msg) => {
      return alerts.find((a) => a.msg === msg);
    }
  );

  if (uniqueAlerts !== null && uniqueAlerts.length > 0) {
    const paramAlerts = uniqueAlerts.filter((alert) => alert.param === param);
    
    const mostRecentAlert = paramAlerts[paramAlerts.length - 1];
  
    if (mostRecentAlert) {
      return (
        <div
          key={mostRecentAlert.id}
          className={`alert alert--${mostRecentAlert.alertType}`}>
          {mostRecentAlert.msg}
        </div>
      );
    }
    return "";
  } else {
    return "";
  }
};

// const Alert = ({ alerts }) => {
//     // Removing Doubles of the same alert
//   const uniqueAlerts = Array.from(new Set(alerts.map((a) => a.msg))).map(
//     (msg) => {
//       return alerts.find((a) => a.msg === msg);
//     }
//   );

//   if (uniqueAlerts !== null && uniqueAlerts.length > 0) {
//     return uniqueAlerts.map((alert, index) => (
//       <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//         {alert.msg}
//       </div>
//     ));
//   } else {
//     return "";
//   }
// };

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
