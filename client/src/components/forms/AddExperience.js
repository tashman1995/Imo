import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience, closeAddExpModal } from "../../actions/profile";
import "./forms.scss";
import Alert from "../layout/Alert";
import { clearAlerts } from "../../actions/alert";

const AddExperience = ({ addExperience, history, clearAlerts }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
    current: false,
    paid: false,
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { title, description, from, to, current, paid } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  return (
    <div className="modal__container--70">
      <div className="modal__headings">
        <h1 className="heading-primary u-margin-bottom-smallest">
          Add Experience
        </h1>
        <h3 className="paragraph u-margin-bottom-smallest">
          Add professional experience you've gained
        </h3>
        <p className="subtext">* = required field</p>
      </div>
      <div className="input-form__container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearAlerts();
            addExperience(formData, history);
          }}
          className="input-form">
          <div className="input-form__row">
            <div className="input-form__group u-margin-bottom-medium">
              <label className="form-label" htmlFor="title">
                Experience Title
              </label>
              <input
                className="input-form__input text-input"
                type="text"
                placeholder="Experience Title"
                onChange={(e) => onChange(e)}
                value={title}
                name="title"
                // required
              />
              <Alert param="title" />
            </div>

            <div className="input-form__group input-form__group--checkbox u-margin-bottom-medium checkbox">
              <div className="form-label">Was this work paid?</div>
              <label htmlFor="paid" className="checkbox-label checkbox__label">
                <input
                  className="checkbox__input"
                  type="checkbox"
                  name="paid"
                  id="paid"
                  value={paid}
                  checked={paid}
                  onChange={(e) => setFormData({ ...formData, paid: !paid })}
                />
                <span className="checkbox__custom checkbox-custom"></span>
              </label>
            </div>
          </div>
          <div className="input-form__row">
            <div className="input-form__group input-form__group--start-date u-margin-bottom-medium">
              <label className="form-label" htmlFor="from">
                Start Date
              </label>
              <input
                className="input-form__input text-input"
                type="date"
                onChange={(e) => {
                  to === ""
                    ? setFormData({
                        ...formData,
                        from: e.target.value,
                        to: e.target.value,
                      })
                    : setFormData({
                        ...formData,
                        from: e.target.value,
                      });
                }}
                value={from}
                name="from"
                // required
              />
              <Alert param="from" />
            </div>

            <div
              className={`input-form__group u-margin-bottom-medium ${
                toDateDisabled && "input-form__group--disabled"
              }`}>
              <label className="form-label form-label--no-wrap" htmlFor="to">
                End Date
              </label>
              <input
                className="input-form__input text-input"
                type="date"
                onChange={(e) => onChange(e)}
                disabled={toDateDisabled ? "disabled" : ""}
                value={to}
                name="to"
                // required
              />
              <Alert param="to" />
            </div>

            <div className="input-form__group input-form__group--checkbox u-margin-bottom-medium checkbox">
              <div className="form-label">Current?</div>
              <label
                htmlFor="current"
                className="checkbox-label checkbox__label">
                <input
                  className="checkbox__input"
                  type="checkbox"
                  name="current"
                  id="current"
                  value={current}
                  checked={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />
                <span className="checkbox__custom checkbox-custom"></span>
              </label>
            </div>
          </div>

          <div className="input-form__group u-margin-bottom-medium ">
            <label className="form-label" htmlFor="email">
              Description
            </label>
            <textarea
              className="input-form__input text-input input-form__input input-form__input--text-area"
              placeholder="Describe your Experience"
              onChange={(e) => onChange(e)}
              value={description}
              name="description"
              rows="5"
              cols="50"
              // required
            ></textarea>
            <Alert param="description" />
          </div>
          <input type="submit" className="btn btn--full-width" />
        </form>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  closeAddExpModal: PropTypes.func.isRequired,
  clearAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  addExperience,
  clearAlerts,
  closeAddExpModal,
})(withRouter(AddExperience));
