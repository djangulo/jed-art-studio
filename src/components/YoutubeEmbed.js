import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const YoutubeEmbed = styled(
  ({ videoId, startAt, privacyMode, showControls }) => {
    let videoUrl = privacyMode
      ? `https://youtube-nocookie.com/embed/${videoId}`
      : `https://youtube.com/embed/${videoId}`;
    if (!showControls || startAt !== 0) videoUrl += "?";
    if (!showControls && startAt !== 0) {
      videoUrl += `controls=0&amp;start=${startAt}`;
    } else if (!showControls && startAt === 0) {
      videoUrl += `controls=0`;
    } else {
      videoUrl += `start=${startAt}`;
    }

    return (
      <iframe
        width='600'
        height='550'
        src={videoUrl}
        frameborder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      />
    );
  }
)`
  display: block;
  max-width: 100%;
  margin: auto;
  height: auto;
`;

YoutubeEmbed.propTypes = {
  videoId: PropTypes.string,
  startAt: PropTypes.number,
  privacyMode: PropTypes.bool,
  showControls: PropTypes.bool
};

export default YoutubeEmbed;
