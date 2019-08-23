import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.website}
                    target="_blank noreferrer noopener"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.social.twitter}
                    target="_blank noreferrer noopener"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.insgram) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.social.insgram}
                    target="_blank noreferrer noopener"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.social.facebook}
                    target="_blank noreferrer noopener"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.social.linkedin}
                    target="_blank noreferrer noopener"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={"https://" + profile.social.youtube}
                    target="_blank noreferrer noopener"
                  >
                    <i class="fab fa-youtube fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
